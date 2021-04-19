#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
#@created: 01.04.2021
#@author: Aleksey Komissarov
#@contact: ad3002@gmail.com

import os, sys

snippet = '''.%s%s {
}
'''

res_snippet = '''
@media screen and (max-width: %spx) {
  .%s%s {
  }
}
'''

### Settings section

root = "russian-travel"

resolutions = [1024, 768, 320]

folders = [
    "blocks",
    "images",
    "pages",
    "variables",
    "vendors",
    "/vendors/fonts",
]

files = [
    ".nojekyll",
    "index.html",
    "variables/variables.css",
    "pages/index.css",
    "vendors/normalize.css",
]

bem = {
    "page": {
      "e": ["__container", "__footer", "__header"],
      "m": [],
    },
    "header": {
      "e": ["__logo", "__lang-link"],
      "m": [("__lang-link", "_active", ""),],
    },
    "lead": {
      "e": ["__title", "__subtitle", "__image", "__figure", "__caption"],
      "m": [],
    },
    "intro": {
      "e": ["__title", "__text", "__list", "__list-text", "__list-number"],
      "m": [],
    },
    "photo-grid": {
      "e": ["__item"],
      "m": [],
    },
    "places": {
      "e": [],
      "m": [],
    },
    "place": {
      "e": ["__title", "__image", "__content", "__paragraph", "__website", "__url_heading", "__link"],
      "m": [],
    },
    "cover": {
      "e": ["__title", "__subtitle", "__link"],
      "m": [],
    },
    "footer": {
      "e": ["__link", "__copyright"],
      "m": [],
    },
}

### Backbone generation

if os.path.isdir(root):
  print("Error: a project folder (%s) exists. Please delete it." % root)
  sys.exit(3)

for folder in folders:
    folder = os.path.join(root, folder)
    if not os.path.isdir(folder):
        os.makedirs(folder)

for file_path in files:
    file_path = os.path.join(root, file_path)
    if not os.path.isfile(file_path):
        with open(file_path, "w") as fw:
            content = ""
            fw.write(content)

index_page_css = os.path.join(root, "pages", "index.css")

with open(index_page_css, "w") as fw_index:

    fw_index.write("@import url(../vendors/normalize.css);\n")
    fw_index.write("@import url(../variables/variables.css);\n")

    bem_root = os.path.join(root, "blocks")
    for block in bem:
        block_folder = os.path.join(bem_root, block)
        if not os.path.isdir(block_folder):
            os.makedirs(block_folder)
        file_path = os.path.join(block_folder, "%s.css" % block)
        if not os.path.isfile(file_path):
            with open(file_path, "w") as fw:
                content = snippet % (block, "")
                fw.write(content)
                for res in resolutions:
                    res_content = res_snippet % (res, block, "")
                    fw.write(res_content)

        style_snippet = "@import url(../blocks/%s/%s.css);\n" % (block, block)
        fw_index.write(style_snippet)

        for elem in bem[block]["e"]:
            el_folder = os.path.join(block_folder, elem)
            if not os.path.isdir(el_folder):
                os.makedirs(el_folder)
            file_path = os.path.join(el_folder, "%s%s.css" % (block,elem))
            if not os.path.isfile(file_path):
                with open(file_path, "w") as fw:
                    content = snippet % (block, elem)
                    fw.write(content)
                    for res in resolutions:
                        res_content = res_snippet % (res, block, elem)
                        fw.write(res_content)

            style_snippet = "@import url(../blocks/%s/%s/%s%s.css);\n" % (block, elem, block, elem)
            fw_index.write(style_snippet)

        for elem, mod, status in bem[block]["m"]:
            mod_folder = os.path.join(block_folder, elem, mod)
            if not os.path.isdir(mod_folder):
                os.makedirs(mod_folder)
            file_path = os.path.join(mod_folder, "%s%s%s.css" % (block, elem, mod+status))
            if not os.path.isfile(file_path):
                with open(file_path, "w") as fw:
                    content = snippet % (block, elem+mod+status)
                    fw.write(content)
                    for res in resolutions:
                        res_content = res_snippet % (res, block, elem+mod+status)
                        fw.write(res_content)

            style_snippet = "@import url(../blocks/%s/%s/%s/%s.css);\n" % (block, elem, mod, block+elem+mod+status)
            fw_index.write(style_snippet)