"""生成站点全部自托管 Web 字体与 @font-face 声明。

字体分工（与 src/styles/base.css 的角色令牌一一对应）：

- MultiplySans   Archivo            拉丁展示与正文
- MultiplyHan    Noto Sans SC       中文无衬线，正文与界面标签
- MultiplyBrush  Leeeaf Hei         中文展示字（Yos-X 主页同款），只用于大标题
- MultiplySerif  Noto Serif SC      中文衬线，用于引文与需要区分的段落
- MultiplyMono   JetBrains Mono     编号、单位、技术标注
- MultiplyJP     Noto Sans JP       日文无衬线，只在 <html lang="ja"> 下替换 Han

所有字体按站内实际字符集子集化，并写入 src/styles/fonts.generated.css。
新增内容后重新运行本脚本。未重新生成时缺字会回退系统字体，站点仍可读。

依赖（安装一次）：python -m pip install fonttools brotli
"""

from __future__ import annotations

from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont, newTable
from fontTools.varLib import instancer


PROJECT_ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIRECTORY = PROJECT_ROOT / "src" / "assets" / "fonts"
VENDOR_DIRECTORY = PROJECT_ROOT / "scripts" / "vendor"
GENERATED_CSS = PROJECT_ROOT / "src" / "styles" / "fonts.generated.css"

SCAN_GLOBS = (
    "src/**/*.vue",
    "src/**/*.ts",
    "src/**/*.css",
    "index.html",
    "public/*.html",
)

SOURCES = {
    "Archivo": VENDOR_DIRECTORY / "Archivo.ttf",
    "NotoSansSC": VENDOR_DIRECTORY / "NotoSansSC.ttf",
    "LeeeafHei": VENDOR_DIRECTORY / "LeeeafHei.ttf",
    "NotoSerifSC": VENDOR_DIRECTORY / "NotoSerifSC.ttf",
    "NotoSansJP": VENDOR_DIRECTORY / "NotoSansJP.ttf",
    "JetBrainsMono": VENDOR_DIRECTORY / "JetBrainsMono.ttf",
}

# 每个字体族重写 name 表，避免与系统已安装的同名字体冲突。
NAME_TABLES = {
    "Archivo": {
        1: "MULTIPLY Sans",
        2: "Regular",
        3: "MULTIPLY Sans Regular 1.000",
        4: "MULTIPLY Sans Regular",
        5: "Version 1.000",
        6: "MultiplySans-Regular",
        16: "MULTIPLY Sans",
        17: "Regular",
    },
    "NotoSansSC": {
        1: "MULTIPLY Han",
        2: "Regular",
        3: "MULTIPLY Han Regular 1.000",
        4: "MULTIPLY Han Regular",
        5: "Version 1.000",
        6: "MultiplyHan-Regular",
        16: "MULTIPLY Han",
        17: "Regular",
    },
    "LeeeafHei": {
        1: "MULTIPLY Brush",
        2: "Regular",
        3: "MULTIPLY Brush Regular 1.000",
        4: "MULTIPLY Brush Regular",
        5: "Version 1.000",
        6: "MultiplyBrush-Regular",
        16: "MULTIPLY Brush",
        17: "Regular",
    },
    "NotoSerifSC": {
        1: "MULTIPLY Serif",
        2: "Regular",
        3: "MULTIPLY Serif Regular 1.000",
        4: "MULTIPLY Serif Regular",
        5: "Version 1.000",
        6: "MultiplySerif-Regular",
        16: "MULTIPLY Serif",
        17: "Regular",
    },
    "JetBrainsMono": {
        1: "MULTIPLY Mono",
        2: "Regular",
        3: "MULTIPLY Mono Regular 1.000",
        4: "MULTIPLY Mono Regular",
        5: "Version 1.000",
        6: "MultiplyMono-Regular",
        16: "MULTIPLY Mono",
        17: "Regular",
    },
    "NotoSansJP": {
        1: "MULTIPLY JP",
        2: "Regular",
        3: "MULTIPLY JP Regular 1.000",
        4: "MULTIPLY JP Regular",
        5: "Version 1.000",
        6: "MultiplyJP-Regular",
        16: "MULTIPLY JP",
        17: "Regular",
    },
}

# 输出文件名、CSS 族名与字重范围。
FAMILIES = {
    "Archivo": {"file": "MultiplySans-Subset.woff2", "css": "MULTIPLY Sans", "weight": "400 800", "variable": True},
    "NotoSansSC": {"file": "MultiplyHan-Subset.woff2", "css": "MULTIPLY Han", "weight": "300 800", "variable": True},
    "LeeeafHei": {"file": "MultiplyBrush-Subset.woff2", "css": "MULTIPLY Brush", "weight": "400", "variable": False},
    "NotoSerifSC": {"file": "MultiplySerif-Subset.woff2", "css": "MULTIPLY Serif", "weight": "300 700", "variable": True},
    "NotoSansJP": {"file": "MultiplyJP-Subset.woff2", "css": "MULTIPLY JP", "weight": "300 800", "variable": True},
    "JetBrainsMono": {"file": "MultiplyMono-Subset.woff2", "css": "MULTIPLY Mono", "weight": "300 700", "variable": True},
}


def collect_charset() -> str:
    characters: set[str] = {chr(code) for code in range(0x20, 0x7F)}
    for pattern in SCAN_GLOBS:
        for path in PROJECT_ROOT.glob(pattern):
            if path.resolve() == GENERATED_CSS.resolve():
                continue
            try:
                text = path.read_text(encoding="utf-8")
            except (UnicodeDecodeError, OSError):
                continue
            for char in text:
                if ord(char) < 0x20:
                    continue
                characters.add(char)
                # text-transform 会生成源码里不存在的大小写形式。
                characters.update(char.upper())
                characters.update(char.lower())
    # 全角标点与中文数字兜底，避免内容微调后出现缺字方框。
    characters.update("，。、；：？！「」『』（）《》〈〉【】—…·×÷§¶†‡°′″€¥£")
    characters.update("0123456789０１２３４５６７８９")
    return "".join(sorted(characters))


def replace_name_table(font: TTFont, family: str) -> None:
    table = newTable("name")
    table.names = []
    font["name"] = table
    for name_id, value in NAME_TABLES[family].items():
        table.setName(value, name_id, 3, 1, 0x0409)
        table.setName(value, name_id, 0, 3, 0)


def load_font(family: str) -> TTFont:
    path = SOURCES[family]
    if not path.exists():
        raise SystemExit(
            f"缺少字体源文件：{path}\n"
            "请把 Archivo / NotoSansSC / LeeeafHei / NotoSerifSC / JetBrainsMono "
            "变量字体或静态字体放到 scripts/vendor/。"
        )
    font = TTFont(path, recalcBBoxes=False, recalcTimestamp=False)
    replace_name_table(font, family)
    if "DSIG" in font:
        del font["DSIG"]
    return font


def subset_font(font: TTFont, text: str) -> TTFont:
    options = subset.Options()
    options.flavor = None
    options.name_IDs = ["*"]
    options.notdef_outline = True
    options.layout_features = ["*"]
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text=text)
    subsetter.subset(font)
    return font


def unicode_range(font: TTFont) -> str:
    codepoints = sorted(font.getBestCmap().keys())
    ranges: list[str] = []
    start = previous = codepoints[0]
    for code in codepoints[1:]:
        if code == previous + 1:
            previous = code
            continue
        ranges.append(f"U+{start:04X}" if start == previous else f"U+{start:04X}-{previous:04X}")
        start = previous = code
    ranges.append(f"U+{start:04X}" if start == previous else f"U+{start:04X}-{previous:04X}")
    return ", ".join(ranges)


def save_woff2(font: TTFont, path: Path) -> None:
    font.flavor = "woff2"
    font.save(path, reorderTables=True)


def build_family(family: str, charset: str) -> str:
    font = load_font(family)
    # 只在确实存在「非 wght」轴时才实例化。
    # 三个 Noto 字体与 JetBrains Mono 都只有 wght 轴，wght 要保留给浏览器做
    # 字重插值；而对只有 wght 的字体调用 instantiateVariableFont 传入空位置
    # 会破坏 GDEF/gvar，随后 subset 直接抛 KeyError。Archivo 有 wdth 轴，
    # 需要固定到 100（它的宽度轴不属于本站的排版语言）。
    if "fvar" in font:
        axes = {axis.axisTag for axis in font["fvar"].axes}
        pinned = {tag: 100.0 for tag in ("wdth",) if tag in axes}
        if pinned:
            font = instancer.instantiateVariableFont(font, pinned, inplace=True)
    subset_font(font, charset)
    coverage = unicode_range(font)
    save_woff2(font, OUTPUT_DIRECTORY / FAMILIES[family]["file"])
    return coverage


def face(family: str, coverage: str) -> str:
    meta = FAMILIES[family]
    fmt = "woff2-variations" if meta["variable"] else "woff2"
    return (
        "@font-face {\n"
        f"  font-family: '{meta['css']}';\n"
        f"  src: url('../assets/fonts/{meta['file']}') format('{fmt}');\n"
        "  font-style: normal;\n"
        f"  font-weight: {meta['weight']};\n"
        "  font-display: swap;\n"
        f"  unicode-range: {coverage};\n"
        "}\n"
    )


def write_css(coverage: dict[str, str]) -> None:
    blocks = ["/* 本文件由 scripts/build-webfont.py 生成，请勿手改。 */\n"]
    blocks.extend(face(family, coverage[family]) for family in FAMILIES)
    GENERATED_CSS.write_text("\n".join(blocks), encoding="utf-8")


def build_webfonts() -> None:
    OUTPUT_DIRECTORY.mkdir(parents=True, exist_ok=True)
    charset = collect_charset()
    print(f"charset: {len(charset)} characters")
    coverage: dict[str, str] = {}
    for family in FAMILIES:
        coverage[family] = build_family(family, charset)
        print(f"  built {FAMILIES[family]['file']}")
    write_css(coverage)
    for path in sorted(OUTPUT_DIRECTORY.glob("*")):
        print(f"{path.name}: {path.stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    build_webfonts()
