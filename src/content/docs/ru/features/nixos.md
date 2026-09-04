---
title: NixOS
description: Установка, запуск, обновление и удаление Waxlight через официальный Nix flake.
sidebar:
  order: 11
---

Waxlight поставляется как Nix flake для **NixOS и других Linux-систем на базе Nix** с архитектурой
`x86_64-linux`. Пакет собирает лаунчер с GTK3 и WebKitGTK 4.1; `steam-run`, `nix-ld` и ручная
настройка библиотек не нужны.

## Запуск без установки

При включённых flakes запустите последнюю ревизию напрямую:

```bash
nix run github:AmadoMuerte/Waxlight-launcher
```

## Установка в профиль пользователя

```bash
nix profile install github:AmadoMuerte/Waxlight-launcher
```

Waxlight также появится в меню приложений рабочего стола. Для удаления:

```bash
nix profile remove Waxlight-launcher
```

## Использование из NixOS flake

Добавьте Waxlight как input и включите его пакет в `environment.systemPackages`:

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

## Данные и обновления

Пользовательские данные остаются в стандартных каталогах XDG, включая `~/.config/waxlight/`.
Инстансы, моды, журналы, настройки и сессии аккаунтов никогда не записываются в неизменяемое
хранилище Nix.

Автообновление лаунчера для Nix-установок отключено: Waxlight не должен заменять исполняемый
файл внутри `/nix/store`. Обновляйте пакет через Nix:

```bash
nix profile upgrade Waxlight-launcher
```

Полный сценарий первого запуска описан в разделе [Быстрый старт](/ru/getting-started/).
