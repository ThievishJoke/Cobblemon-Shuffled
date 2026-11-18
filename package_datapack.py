
import zipfile
from pathlib import Path

# Configuration

COBLEMON_VERSION = "1.8.4"
PACK_VERSION = "1.4.0"

PACK_NAME = f"Cobblemon-Shuffled {COBLEMON_VERSION}+{PACK_VERSION}"

SOURCE_DIR = Path(__file__).parent
BUILDS_DIR = SOURCE_DIR / "builds"
OUTPUT_FILE = BUILDS_DIR / f"{PACK_NAME}.zip"

BUILD_ITEMS = [
    "assets",
    "data",
    "pack.mcmeta",
    "pack.png",
    "README.md",
    "LICENSE"
]

IGNORE_DIRS = [
    "decoupled_forms"
]

def should_ignore(path: Path) -> bool:
    """Check whether a file belongs to an ignored directory."""
    return any(part in IGNORE_DIRS for part in path.parts)

def add_to_archive(zip_file: zipfile.ZipFile, path: Path) -> int:
    """Add a file or directory to the archive. Returns the number of files added."""
    if path.is_file():
        zip_file.write(path, path.relative_to(SOURCE_DIR))
        return 1

    if not path.is_dir():
        return 0

    added = 0

    for file in path.rglob("*"):
        if not file.is_file():
            continue

        relative_path = file.relative_to(SOURCE_DIR)

        if should_ignore(relative_path):
            continue

        zip_file.write(file, relative_path)
        added += 1

    return added

def package_datapack() -> None:
    """Build the datapack ZIP archive."""
    print(f"Building {PACK_NAME}...\n")

    BUILDS_DIR.mkdir(parents=True, exist_ok=True)

    missing = []
    added = 0

    with zipfile.ZipFile(
        OUTPUT_FILE,
        mode="w",
        compression=zipfile.ZIP_DEFLATED,
    ) as zip_file:

        for item in BUILD_ITEMS:
            path = SOURCE_DIR / item

            if not path.exists():
                print(f"[WARNING] Missing: {item}")
                missing.append(item)
                continue

            added += add_to_archive(zip_file, path)

        # Include all root-level balance Markdown files.
        included = set(BUILD_ITEMS)

        for md_file in SOURCE_DIR.glob("*.md"):
            if md_file.name not in included:
                added += add_to_archive(zip_file, md_file)

    print("\nBUILD COMPLETE")
    print(f"Name: {PACK_NAME}")
    print(f"Output: {OUTPUT_FILE}")
    print(f"Files packaged: {added}")

    if missing:
        print(f"\n[WARNING] {len(missing)} missing items:")

        for item in missing:
            print(f"  - {item}")


if __name__ == "__main__":
    package_datapack()