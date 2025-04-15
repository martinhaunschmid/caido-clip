# caido-clip

A simple plugin for Caido allowing the use of several clipboards simultaneously and giving you a way to name clipboards as well as defining shortkeys for them.

## Background

When testing for access controls manually, I like to have several IDs, Access Tokens and other things at hand. Especially if the access token you used in AuthMatrix is expired, but you have 40 open Replay tabs.

For this (and several other use cases I'm not yet aware of), caido-clip was developed. 

## Features

- Name clipboards
- The clipboard name (or value, if no name is set) is shown in the Command Palette
- Insert the value of a clipboard via Hotkey (default: `CMD + <clipboard id>`)
- Set Hotkeys to set the value of a clipboard (default: `CMD + ALT + <clipboard id>`)

## Roadmap
Things I will add along the line (some depend on the development of the Caido ecosystem as a whole). Ideas are very welcome.

- Saving Clipboards in a SQLite database, preferrably on a per-project basis
- Having a dedicated space in the UI for the names or values of the clipboards, e.g. in the status bar in the bottom of Caido
- Being able to chain Workflows behind clipboards, essentially giving you hotkeys for running workflows like conversion or getting a new access token.