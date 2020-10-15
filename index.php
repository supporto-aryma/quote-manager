<?php
require_once("../../fl_core/autentication.php");
?>

<!DOCTYPE html>
<html lang="it">

<head>
  <meta charset="utf-8" />
  <title>Planner Evento | <?php echo sitename; ?></title>

  <!-- Smarthphone -->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="format-detection" content="telephone=no">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

  <!-- VENDOR -->
  <script src="<?php echo ROOT . $cp_admin . $cp_set; ?>jsc/fontawesome-all.min.js" type="text/javascript"></script>
  <script src="js/IEsucks.js"></script>
  <link rel="icon" href="<?php echo ROOT . $cp_admin . $cp_set; ?>css/lay/a.ico" type="image/x-icon" />
  <link rel="shortcut icon" href="<?php echo ROOT . $cp_admin . $cp_set; ?>css/lay/a.ico" type="image/x-icon" />
  <link rel="apple-touch-icon" href="<?php echo ROOT . $cp_admin . $cp_set; ?>lay/a.png" />


  <!-- STYLES -->
  <link rel="stylesheet" href="css/bulma.min.css">
  <link rel="stylesheet" href="css/style.css">
</head>


<body>

  <!-- <div id="preloader">
    <img src="../fl_set/img/preloader.png" />
    <a href="#" onClick="location.reload();" style="font-size: smaller; display: block; text-align: center;">Caricamento</a>
  </div> -->

  <?php if (!isset($_GET['external'])) { ?>

    <div id="up_menu" class="level noprint">
      <div class="topsx">
        <a class="back" href="javascript:history.back();">
          <i class="fa fa-angle-left is-size-3 has-text-dark"></i>
        </a>
      </div>
      <div class="appname">
        <a href="<?php echo (isset($_SESSION['POST_BACK_PAGE'])) ? $_SESSION['POST_BACK_PAGE'] : 'javascript:history.back();'; ?>">
          <img src="<?php echo LOGO; ?>" alt="<?php echo client; ?>" />
        </a>
      </div>
      <div class="topdx"></div>
    </div>
  <?php } ?>

  <div class="container">

    <div id="app">
      <!-- <h1 class="title">Quote</h1> -->
      <content-container></content-container>
    </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rasterizehtml/1.3.0/rasterizeHTML.allinone.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.4.0/jspdf.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/2.3.5/jspdf.plugin.autotable.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="vendor/axios.min.js"></script>
  <!-- <script src="vendor/vue.min.js"></script> -->
  <script src="js/main.js"></script>
</body>

</html>