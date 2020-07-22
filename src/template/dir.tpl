<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{title}}</title>
  <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
  <style>
    html,
    body {
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

    .footer, .footer > a {
      font-size: 1rem;
      line-height: 2rem;
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
      transition: 0.2s all;
    }

    .container a:link,
    .container a:visited {
      text-decoration: none;
      color: #000;
    }

    .container a:hover,
    .container a:active {
      text-decoration: none;
      color: #31A67B;
    }

    .box {
      display: inline-block;
      width: 23%;
      margin-bottom: 10px;
    }

    .box a {
      margin-left: 10px;
    }

    @media screen and (max-width: 1000px) {
      .box {
        width: 48%;
      }
    }

    @media screen and (max-width: 600px) {
      .box {
        width: 98%;
      }
    }

    a {
      text-decoration: none;
      font-size: 1rem;
      color: #31A67B;
    }

    a:link,
    a:visited {
      text-decoration: none;
      color: #31A67B;
    }

    a:hover,
    a:active {
      text-decoration: underline;
      color: #31A67B;
    }
  </style>
</head>

<body>
  <h1 class="title">wherever</h1>
  <div class="container">
    {{#each files}}
    <div class="box">
      <span><i class="fa fa-{{icon}}"></i><a href="{{../dir}}/{{file}}">{{file}}</a></span>
    </div>
    {{/each}}
  </div>
  <div class="footer">
    <div>Created By coyeah | <a href="https://github.com/Coyeah/wherever" target="_blank">github here</a></div>
    <div>&copy; 2018<span id="copyright_end_time"></span></div>
  </div>
  <script>
    const date = new Date();
    const year = date.getFullYear();
    if (year !== 2018) {
      document.getElementById('copyright_end_time').textContent = ' - ' + year;
    }
  </script>
</body>

</html>