<p align="center">
 <img width="340px" src="https://res.cloudinary.com/ydevcloud/image/upload/v1689361177/YsnIrix/civz9bmgwiv0qg1ez7el.svg" align="center" alt="gdrive" />
</p>

<br>

<div align="center">

[![npm version](https://img.shields.io/npm/v/@ysn4irix/filego.svg?style=flat-square)](https://www.npmjs.org/package/@ysn4irix/filego) [![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=@ysn4irix/filego&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=@ysn4irix/filego) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ysn4irix/filego?style=flat-square)](https://bundlephobia.com/package/@ysn4irix/filego)

</div>

<p align="center">
  <b>📟 Command line interface to recursively upload files/folder to +14 anonymous file-sharing platforms
  </b>
  <br>
</p>

<br>

<p align="center">
  <img src="https://res.cloudinary.com/ydevcloud/image/upload/v1689362783/YsnIrix/ubzdcvgqf32jya7lovdm.gif" alt="gdrive-cli" width="900" style="border-radius: 5px;"><br>
</p>

<br>

![📟](https://res.cloudinary.com/ydevcloud/image/upload/v1656874185/asm9cp84cbuuqmarw9wq.png)

## ❯ Install

Requires Node.js 17.0 or higher download & install for [Windows](https://nodejs.org/en/download/) or [Linux](https://nodejs.org/en/download/)

```sh
npm install --location=global @ysn4irix/filego
```

<br>

![⚙️](https://res.cloudinary.com/ydevcloud/image/upload/v1656874522/fmfktytvymbnnc0fg4zz.png)

## ❯ Usage

```sh
filego up -s local-path-of-your-file-or-folder -o output-path
```

-   `local-path-of-your-file-or-folder` is the path of the file or folder you want to upload.
-   `output-path` is the path where you want to save the uploaded file or folder.

folder example:

```sh
filego up -s /home/user/Documents -o /home/user/Downloads
```

file example:

```sh
filego up -s /home/user/Documents/file.txt -o /home/user/Downloads
```

<b>Max size of file or folder to upload is `5GB`</b>

#### COMMANDS

```sh
up  Upload a file or folder
```

#### OPTIONS

```sh
-s, --source   file or folder to be uploaded
-o, --output   Output directory
--clear        Clear the console
--help         Print help info
--debug        Print debug info
-v, --version  Print CLI version
```

<br>

![🙌](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/connect.png)

## ❯ Contributing

Pull requests and stars are always welcome. For bugs and features requests, [please create an issue](../../issues/new).

<br>

<p align="center">
  <img src="https://res.cloudinary.com/ydevcloud/image/upload/v1657122244/yassi/goafdvoalju7ty1seuqo.gif" alt="star-repo" style="border-radius: 5px;">
  <br>
</p>

![📃](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/license.png)

## ❯ License

Copyright © 2023-present, [Ysn4Irix](https://github.com/Ysn4Irix).
Released under the [MIT License](LICENSE).
