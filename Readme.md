# Descord

## 📥 Installation

```
npm install -g descord
```

## 📌 What is Descord ??

**Descord** is an npm package to help you generate discord bot project via CLI(Command-line Interface)

## 📌 Should I use Descord ?

Do you often to create new Discord.js bot project ?? if you do it often this package is recomended for your job, **Why ??**, because you can generate new Discord.js bot project quickly without copy and paste your old project to your new project or without import github repository into your project.

## 🔎 Features

### What are the features available on Descord Package?

Descord doesn't have very many features, but it can really help your job quickly. There are:

- Generate Advanced/Basic ( includes event, permission, cooldown handler ) command handler quickly
- Generate Complete setup of Discord.js bot project ( same as generate advanced command handler )
- Create a command quickly
- Create a event file quickly

## 🔧 How to use ??

## Manually

If you want to generate Discord.js bot manually, You can just type `descord generate` in terminal and you can choose the option you want

## Quickly

### Create Handler

```
descord createHandler [options]

options:
    -h, --handler [type of handler]   (required)
    -t, --token   [bot token]         (required)
    -p, --prefix  [bot prefix]          (required)
    -l, --logs    [channel id will you set as logs command]    (required)
```

### Create Command

```
descord createCommand [options]

options:
    -n, --name [name of the command]  (required)
    -d, --description [description of the command]
    -u, --usage [command usage description]
    -a, --aliasses [aliases of the command, split with (,), ex: ping,beep,boop]
    -p, --premissions [list of command permissions, split(,), ex: ADMINISTRATOR,MANAGE_CHANNELS]
    -c, --cooldown [cooldown of the command]
    -f, --category [command category]  (required)
```

### Complete Setup

```
descord completeSetup [options]

options:
    -t, --token   [bot token]         (required)
    -p, --prefix  [bot prefix]          (required)
    -l, --logs    [channel id will you set as logs command]    (required)
```

### Create Event

```
descord createEvent [options]

options:
    -n, --name [name of the events]   (required)
```

## 📘 Note

If you found some bug, please report in our github issues [https://github.com/SadesXD/descord/issues](https://github.com/SadesXD/descord/issues) or in our discord server [https://discord.gg/8rUvTYhFqK](https://discord.gg/8rUvTYhFqK)
