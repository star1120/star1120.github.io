/**
 * Created by yuchuang on 2017/6/5.
 */
  var UploadImg=function(o){
    var file=o.files;
    if(file.size && file.size > o.mixsize) {
      o.error('大小超过限制');
    } else if(o.type && o.type.indexOf(file.type) < 0) {
      o.error('格式不正确');
    } else {
      var URL = URL || webkitURL;
      var blob = URL.createObjectURL(file);
      _compress(blob, file);
    }
  function _compress(blob, file) {
    var img = new Image();
    img.src = blob;
    img.onload = function() {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      if(!o.width && !o.height && o.quality == 1) {
        var w = this.width;
        var h = this.height;
      } else {
        var w = o.width || this.width;
        var h = o.height || w / this.width * this.height;
      }
      if(canvas){
        document.querySelectorAll('canvas').style={
          width: w,
          height: h
        };
      }
      ctx.drawImage(this, 0, 0, w, h);
      var base64 = canvas.toDataURL(file.type, (o.quality || 0.8) * 1);
      if(navigator.userAgent.match(/iphone/i)) {
        var myorientation = 0;
        window.EXIF.getData(file, function() {
          //图片方向角
          var Orientation = null;
          // alert(EXIF.pretty(this));
          EXIF.getAllTags(this);
          //alert(EXIF.getTag(this, 'Orientation'));
          myorientation = EXIF.getTag(this, 'Orientation');
          var mpImg =new MegaPixImage(img);
          mpImg.render(canvas, {
            maxWidth: w,
            maxHeight: h,
            quality: o.quality || 0.8,
            orientation: myorientation
          });
          base64 = canvas.toDataURL(file.type, o.quality || 0.8);
          o.success(base64);
        });
      }

      // 修复android
      if(navigator.userAgent.match(/Android/i)) {
        //var encoder = new JPEGEncoder();
        //base64 = encoder.encode(ctx.getImageData(0, 0, w, h), o.quality * 100 || 80);
        //o.success(base64);
        var mpImg = new MegaPixImage(img);
        mpImg.render(canvas, {
          maxWidth: w,
          maxHeight: h,
          quality: o.quality || 0.8,
          orientation: myorientation
        });
        base64 = canvas.toDataURL(file.type, o.quality || 0.8);
        o.success(base64);
      }
    };
  };
};
export default UploadImg;
