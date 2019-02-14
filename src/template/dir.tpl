<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{title}}</title>
  <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
  <style>
    html, body {
      background-color: #eee;
      font-size: 16px;
    }

    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    .container {
      border: 5px solid #31A67B;
      background-color: #f8f8f8;
      border-radius: 10px;
      padding: 30px;
      margin: 30px 30%;
      box-shadow: 3px 3px 3px #888;
    }

    a {
      font-size: 1rem;
      transition: 0.5s padding;
      margin-left: 30px;
    }

    a:link, a:visited {
      text-decoration: none;
      color: #000;
    }

    a:hover, a:active {
      padding-left: 15px;
      font-weight: bold;
    }

    .flex {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 3px 0;
    }

    .back {
      margin-top: 10px;
      text-align: right;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="container">
  {{#each files}}
    <div class="flex">
      <div style="width: 10px;"><i class="fa fa-{{icon}}"></i></div>
      <div><a href="{{../dir}}/{{file}}">{{file}}</a></div>
    </div>
  {{/each}}
  </div>
</body>
</html>
