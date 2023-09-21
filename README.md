# Markdown guide generator

A very simple frontend from `.md` file for small instructions/guides etc.

Demo: https://guide.stranno.su

## Usage

Enter the data into the INDEX.md file. Use `##` and `###` headings for the first and second level sections. They will be automatically added to the menu. Code insertion in different languages is supported.

You need download the code to the server or you can use [browser-sync](https://github.com/Browsersync/browser-sync):

```bash
# You need a Node.js installed

# Download the utility
npm install -g browser-sync

# Run a simple server
browser-sync start --server --files "**/*"
```
