---
title: Privacy Policy
description: What is stored locally and which third-party services the launcher contacts.
sidebar:
  order: 31
---

What Waxlight stores locally and which third-party services the launcher contacts.

_Canonical source: [docs/PRIVACY.md](https://github.com/AmadoMuerte/Waxlight-launcher/blob/main/docs/PRIVACY.md)._

## 1. Local data

Waxlight stores launcher settings, installed game versions, instances, mods, downloads, logs, playtime records, and other launcher state on the user's device. The default data directory is the operating system configuration directory and can be relocated from Waxlight settings.

Persistent Vintage Story session credentials are stored through the operating system's native credential store. Passwords and TOTP codes are not persisted by Waxlight. Authentication values temporarily required by Vintage Story may be injected into an instance configuration while the game is running and are cleaned up by the launcher afterwards.

## 2. Telemetry

Waxlight does not collect or transmit any telemetry.

## 3. Third-party services

Waxlight contacts the following services. Information sent directly to them is governed by their own privacy policies:

- **Vintage Story / Anego Studios** — authentication, account validation, game-version discovery/downloads, and ModDB functionality. [Vintage Story Privacy Policy](https://www.vintagestory.at/privacy/).
- **GitHub** — release information, downloads, and update discovery. Automatic update checking is enabled by default and checks GitHub when the launcher starts; it can be disabled in **Settings → Updates**. [GitHub Privacy Statement](https://docs.github.com/site-policy/privacy-policies/github-privacy-statement).

## 4. Security and transparency

Waxlight is open source, and its network behavior is available for public review in the repository.

Security vulnerabilities or suspected exposure of sensitive information should be reported using the private process described in the [security policy](/en/policies/security/). Do not post credentials, tokens, or other sensitive information in a public issue.

## 5. Privacy requests and contact

For privacy questions or requests, contact the repository owner through the [GitHub profile](https://github.com/AmadoMuerte) and request a private communication channel.

## 6. Changes to this policy

This policy may be updated when Waxlight's data practices, infrastructure, or legal obligations change. Material changes will be published in the repository.
