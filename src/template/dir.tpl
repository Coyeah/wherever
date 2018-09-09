<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{title}}</title>
  <style>
    body {
      margin: 30px;
    }

    div {
      border: 3px solid #eee;
      border-radius: 10px;
      box-sizing: border-box;
      padding: 20px 30px;
    }

    a {
      display: block;
      font-size: 16px;
      margin: 15px 0;
      transition: 0.5s padding;
    }

    a:link, a:visited {
      text-decoration: none;
      color: #000;
    }

    a:hover, a:active {
      padding-left: 15px;
      font-weight: bold;
    }

    span {
      padding-left: 20px;
      font-weight: normal;
    }
  </style>
</head>
<body>
  <div>
  {{#each files}}
    <a href="{{../dir}}/{{file}}">{{file}}<span>[{{icon}}]<span></a>
  {{/each}}
  </div>
</body>
</html>
