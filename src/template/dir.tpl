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
      position: relative;
    }

    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    .title {
      margin: 30px 10%;
    }

    .footer {
      display: block;
      text-align: center;
    }

    .footer p {
      margin-bottom: 20px;
    }

    .container {
      border: 5px solid #31A67B;
      background-color: #f8f8f8;
      border-radius: 10px;
      padding: 30px;
      margin: 30px 10%;
      box-shadow: 3px 3px 3px #888;
    }

    .container a {
      font-size: 1rem;
      transition: 0.5s padding;
    }

    .container a:link, .container a:visited {
      text-decoration: none;
      color: #000;
    }

    .container a:hover, .container a:active {
      padding-left: 15px;
      font-weight: bold;
      color: #31A67B;
    }

    .box {
      display: inline-block;
      width: 23%;
      margin-bottom: 10px;
    }

    a {
      text-decoration: none;
      font-size: 1rem;
      color: #31A67B;
    }

    a:link, a:visited {
      text-decoration: none;
      color: #31A67B;
    }

    a:hover, a:active {
      text-decoration: underline;
      color: #31A67B;
    }
  </style>
</head>
<body>
  <h1 class="title">Wherever</h1>
  <div class="container">
  {{#each files}}
    <div class="box">
      <span><i class="fa fa-{{icon}}"></i></span>
      <span><a href="{{../dir}}/{{file}}">{{file}}</a></span>
    </div>
  {{/each}}
  </div>
  <div class="footer">
    <p>Copyright 2018 &copy; Created By Coyeah_chen@outlook.com</p>
    <p>Github: [ <a href="https://github.com/Coyeah/wherever" target="_blank">https://github.com/Coyeah/wherever</a> ]</p>
  </div>
</body>
</html>
