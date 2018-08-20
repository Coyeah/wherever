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

    a {
      display: block;
      font-size: 16px;
      padding: 5px 0;
    }
  </style>
</head>
<body>
  {{#each files}}
    <a href="{{../dir}}/{{file}}">{{file}}  [{{icon}}]</a>
  {{/each}}
</body>
</html>
