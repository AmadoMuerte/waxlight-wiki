---
title: Instances
description: Isolated game environments with their own mods, settings, game version, and account.
sidebar:
  order: 23
---

Isolated game environments: every playthrough gets its own mods, settings, game version, and account.

## What an instance is

An instance is a separate copy of the game environment inside the launcher data directory's `instances/` folder. Each instance has its own:

- game version (from those installed in [Game Versions](/en/features/game-versions/));
- Vintage Story account;
- mods and their enabled/disabled state;
- game settings (`clientsettings.json`), mod configs, saves;
- launch arguments;
- playtime statistics and launch logs.

Instances are isolated from each other: changes in one never affect the others. The filesystem is the source of truth for installed files.

## Library

The Library section lists all instances. From here you can create, configure, launch, clone, and delete instances, and jump to their mods and packages.

## Create and clone

- **Create** — a new instance: pick a name, game version, and account.
- **Clone** — a copy of an existing instance with all its mods and settings. Great for experiments: the original stays untouched.

## Launching

The Play button injects the selected account's session data into `clientsettings.json` (only for the duration of the game session — see [Accounts & sign-in](/en/features/accounts/)) and starts the game. Launches for a single instance are serialized so credential injection stays deterministic.

## Related features

- [Mods & ModDB](/en/features/mods/) — installing and updating an instance's mods.
- [Backups & recovery](/en/features/backups/) — instance snapshots and rollback.
- [Instance packages](/en/features/packages/) — export and import with private-data sanitization.
