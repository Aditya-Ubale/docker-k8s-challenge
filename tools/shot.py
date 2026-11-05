import sys
from playwright.sync_api import sync_playwright
url, out = sys.argv[1], sys.argv[2]
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1000, "height": 560})
    pg.goto(url)
    pg.wait_for_timeout(1000)
    pg.screenshot(path=out)
    b.close()
