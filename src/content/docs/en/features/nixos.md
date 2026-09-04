---
title: NixOS
description: Install, run, update, and remove Waxlight with the official Nix flake.
sidebar:
  order: 11
---

Waxlight is packaged as a Nix flake for **NixOS and other Nix-based Linux systems** on `x86_64-linux`.
The package builds the launcher with GTK3 and WebKitGTK 4.1; no `steam-run`, `nix-ld`, or manual
library setup is required.

## Run without installing

With flakes enabled, start the latest source revision directly:

```bash
nix run github:AmadoMuerte/Waxlight-launcher
```

## Install into your user profile

```bash
nix profile install github:AmadoMuerte/Waxlight-launcher
```

This also adds Waxlight to the desktop application launcher. To remove it later:

```bash
nix profile remove Waxlight-launcher
```

## Use from a NixOS flake

Add Waxlight as an input and include its package in `environment.systemPackages`:

```nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    waxlight.url = "github:AmadoMuerte/Waxlight-launcher";
  };

  outputs = { nixpkgs, waxlight, ... }: {
    nixosConfigurations.my-machine = nixpkgs.lib.nixosSystem {
      modules = [
        ({ pkgs, ... }: {
          environment.systemPackages = [ waxlight.packages.${pkgs.system}.default ];
        })
      ];
    };
  };
}
```

## Data and updates

User data stays in the normal XDG directories, including `~/.config/waxlight/`. Instances, mods,
logs, configuration, and account sessions are never written into the immutable Nix store.

The launcher self-updater is disabled for Nix installations: Waxlight must not replace an
executable inside `/nix/store`. Update the package through Nix instead:

```bash
nix profile upgrade Waxlight-launcher
```

For the complete first-run flow, continue with [Getting started](/en/getting-started/).
