---
title: Optimum
description: Installing Optimum, connecting it to Waxlight, and launching optimized instances.
sidebar:
  order: 24.5
---

Optimum is a separate client that applies engine optimizations before Vintage Story starts. Waxlight does not install or update it, but version 0.3.6 and later can detect an existing installation and use it to launch selected instances.

:::caution
Waxlight's Optimum integration is available only on Windows and Linux. The Vintage Story version in Optimum must exactly match the version used by the selected instance.
:::

## 1. Prepare the game version

1. Check which Vintage Story version your chosen Optimum version requires.
2. Open **Game Versions** in Waxlight and install that version. See [Game Versions](/en/features/game-versions/).

Do not continue with a different version: Waxlight checks compatibility before launch and refuses to start a mismatched pair.

## 2. Install Optimum

1. Open the [official Optimum installation guide](https://github.com/Zaldaryon/Optimum/wiki/Installation).
2. Complete the requirements and steps for your operating system. If the installer does not detect Vintage Story automatically, select the installed game version's directory.
3. You may disable desktop and menu shortcut options: they are not needed when launching through Waxlight.
4. Keeping the suggested installation directory is recommended. If you change it, remember the selected path.
5. Start the installation and wait for it to finish completely.

Optimum creates a separate, self-contained client copy and does not modify the original Vintage Story files.

## 3. Connect Optimum to Waxlight

1. Restart Waxlight after installing Optimum.
2. Open **Settings → Optimum**.
3. Check the installation path and status. If Optimum was not detected, select **Detect**.
4. If automatic detection still fails, select **Browse** and choose your installation: `Optimum.exe` on Windows or the Optimum directory on Linux.
5. Confirm that the status says **Optimum is ready** and shows the required Vintage Story version. Save the settings if you selected a path manually.

By default, Waxlight checks the official installer's registration as well as `C:\Games\Optimum` on Windows and `~/.local/share/optimum` on Linux.

## 4. Launch an instance with Optimum

1. Create a new instance or open an existing instance's settings from the **Library**.
2. Confirm that the instance uses the same Vintage Story version as Optimum.
3. Change **Game client** from **Vanilla** to **Optimum**.
4. Save the instance and select **Play**.

Waxlight continues to pass the instance data directory, account, launch arguments, and selected server address, and still records logs and playtime. Optimum prepares and caches its optimized files on the first launch, so that launch may take longer than subsequent ones.

:::caution
Do not use the OptiTime mod together with Optimum: their functionality overlaps and may cause problems. Waxlight warns you when OptiTime is enabled in such an instance.
:::

## Troubleshooting

- **Incompatible Optimum version** — install Optimum for the Vintage Story version used by the instance, or switch the instance back to **Vanilla**.
- **Optimum is not configured** — run detection again under **Settings → Optimum**, or select the installation manually.
- **Installation is already in use** — on Windows, one Optimum installation cannot run multiple instances at the same time. Close the running game and try again.
- After updating Optimum, check its status and game version in Waxlight settings again.

For installer, patching, or cache problems, see the [official Optimum wiki](https://github.com/Zaldaryon/Optimum/wiki).
