/*  Time Range Slider - v1.0.5 - 2022-05-08
 *  https://github.com/VatsalMewada/time_range_slider
 *  https://www.npmjs.com/package/@vatsalmewada/time_range_slider
 *  Copyright Vatsal Mewada and other contributors; Licensed MIT. */

(function ( $ ) {
  function decimal_to_custom_time(time){
    var hrs = lead_zeros(parseInt(time))
    var local_mins = time - hrs
    var mins
    switch (local_mins) {
      case 0:
        mins = '00'; break;
      case 0.25:
        mins = '15'; break;
      case 0.50:
        mins = '30'; break;
      case 0.75:
        mins = '45'; break;
    }
    return hrs + ':' + mins
  }

  function time_string_to_float(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }

  function time_12_format(time){
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      time = time.slice (1);
      time[5] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = +time[0] % 12 || 12;
    }
    return time.join ('');
  }

  function lead_zeros(num) {
    var s = num + "";
    while (s.length < 2) s = "0" + s;
    return s;
  }

  function create_css_selector (selector, style) {
    try{
      if (!document.styleSheets) return;
      if (document.getElementsByTagName('head').length == 0) return;
      var styleSheet,mediaType;
      if (document.styleSheets.length > 0) {
        for (var i = 0, l = document.styleSheets.length; i < l; i++) {
          if (document.styleSheets[i].disabled) 
            continue;
          var media = document.styleSheets[i].media;
          mediaType = typeof media;

          if (mediaType === 'string') {
            if (media === '' || (media.indexOf('screen') !== -1)) {
              styleSheet = document.styleSheets[i];
            }
          }
          else if (mediaType=='object') {
            if (media.mediaText === '' || (media.mediaText.indexOf('screen') !== -1)) {
              styleSheet = document.styleSheets[i];
            }
          }

          if (typeof styleSheet !== 'undefined') 
            break;
        }
      }
      if (typeof styleSheet === 'undefined') {
        var styleSheetElement = document.createElement('style');
        styleSheetElement.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(styleSheetElement);

        for (i = 0; i < document.styleSheets.length; i++) {
          if (document.styleSheets[i].disabled) {
            continue;
          }
          styleSheet = document.styleSheets[i];
        }

        mediaType = typeof styleSheet.media;
      }

      if (mediaType === 'string') {
        for (var i = 0, l = styleSheet.rules.length; i < l; i++) {
          if(styleSheet.rules[i].selectorText && styleSheet.rules[i].selectorText.toLowerCase()==selector.toLowerCase()) {
            styleSheet.rules[i].style.cssText = style;
            return;
          }
        }
        styleSheet.addRule(selector,style);
      }
      else if (mediaType === 'object') {
        var styleSheetLength = (styleSheet.cssRules) ? styleSheet.cssRules.length : 0;
        for (var i = 0; i < styleSheetLength; i++) {
          if (styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
            styleSheet.cssRules[i].style.cssText = style;
            return;
          }
        }
        styleSheet.insertRule(selector + '{' + style + '}', styleSheetLength);
      }
    }catch(err){}
  }
  
  $.fn.time_range_slider = function( options ) {
    var settings = $.extend({
        backgroundColor: 'white',
        main_sel: '.time_range_slider',
        start_time_sel: '.start_time_input',
        end_time_sel: '.end_time_input',
        start_time: '12:00',
        end_time: '15:00',
    }, options );

    create_css_selector(settings.main_sel, 'position:relative;width:200px;height:35px;text-align:center;');
    create_css_selector('.time_range_slider_input', 'pointer-events: none;position: absolute;left: 0;top: 15px;width: 200px;outline: none;height: 6px;margin: 0;padding: 0;-webkit-appearance: none !important;background-color: lightgray;border-radius: 24px;');
    create_css_selector('.time_range_slider_input::-webkit-slider-thumb', 'pointer-events: all; position: relative;z-index: 1;outline: 0;');
    create_css_selector('.time_range_slider_input::-moz-range-thumb', 'pointer-events: all;position: relative;z-index: 10;-moz-appearance: none; width: 15px;');
    create_css_selector('.time_range_slider_input::-moz-range-track', 'position: relative;z-index: -1;background-color: rgba(0, 0, 0, 1);border: 0;');
    create_css_selector('.time_range_slider_input:last-of-type::-moz-range-track', '-moz-appearance: none;background: none transparent;border: 0;');
    create_css_selector('.time_range_slider_input[type=range]::-moz-focus-outer', 'border: 0;');
    create_css_selector('.start_time_range_slider::-webkit-slider-thumb', '-webkit-appearance: none;width: 20px;height: 20px;border-radius: 20px;border: 1px lightgray solid;background-color: white;overflow: visible;cursor: pointer;');
    create_css_selector('.end_time_range_slider::-webkit-slider-thumb', '-webkit-appearance: none;width: 20px;height: 20px;border-radius: 20px;border: 1px lightgray solid;background-color: white;overflow: visible;cursor: pointer;');

    var slider1 = '<input value="' + time_string_to_float(settings.start_time) + '" min="0" max="24" step="0.25" type="range" class="start_time_range_slider time_range_slider_input" title="Start Time">'
    var slider2 = '<input value="' + time_string_to_float(settings.end_time) + '" min="0" max="24" step="0.25" type="range" class="end_time_range_slider time_range_slider_input" title="End Time">'
    this.append(slider1, slider2)

    $(document).on('input change', '.start_time_range_slider', function(){
      var s_slide = $(this)[0];
      var s_slidePos = s_slide.value / s_slide.max;
      var s_pixelPostion = s_slide.clientWidth * s_slidePos;
      var e_slide = $('.end_time_range_slider')[0];
      var e_slidePos = e_slide.value / e_slide.max;
      var e_pixelPostion = e_slide.clientWidth * e_slidePos;
      if(s_pixelPostion > e_pixelPostion){
        $(this).val($('.end_time_range_slider').val() - 1)
      }
      var s_step = ($(this).val() - parseFloat($(this).attr('min'))) * 100 / (parseFloat($(this).attr('max') - $(this).attr('min'))) + 2
      var e_step = ($('.end_time_range_slider').val() - parseFloat($('.end_time_range_slider').attr('min'))) * 100 / (parseFloat($('.end_time_range_slider').attr('max') - $('.end_time_range_slider').attr('min'))) - 2
      $('.time_range_slider_input').attr('style', "background-image: linear-gradient(to right, lightgray " + s_step + "%, blue " + s_step + "% " + e_step + "%, lightgray " + e_step + "%) !important; border-radius: 24px;")
      $(settings.start_time_sel).val(time_12_format(decimal_to_custom_time($(this).val())))
    })

    $(document).on('input change', '.end_time_range_slider', function(){
      var s_slide = $('.start_time_range_slider')[0];
      var s_slidePos = s_slide.value / s_slide.max;
      var s_pixelPostion = s_slide.clientWidth * s_slidePos;
      var e_slide = $(this)[0];
      var e_slidePos = e_slide.value / e_slide.max;
      var e_pixelPostion = e_slide.clientWidth * e_slidePos;
      if(s_pixelPostion > e_pixelPostion){
        $(this).val($('.start_time_range_slider').val() + 1)
      }
      var s_step = ($('.start_time_range_slider').val() - parseFloat($('.start_time_range_slider').attr('min'))) * 100 / (parseFloat($('.start_time_range_slider').attr('max') - $('.start_time_range_slider').attr('min'))) + 2
      var e_step = ($(this).val() - parseFloat($(this).attr('min'))) * 100 / (parseFloat($(this).attr('max') - $(this).attr('min'))) - 2
      $('.time_range_slider_input').attr('style', "background-image: linear-gradient(to right, lightgray " + s_step + "%, blue " + s_step + "% " + e_step + "%, lightgray " + e_step + "%) !important; border-radius: 24px;")
      $(settings.end_time_sel).val(time_12_format(decimal_to_custom_time($(this).val())))
    })
    $('.time_range_slider_input').change();
    return this.css({
        color: settings.color,
        backgroundColor: settings.backgroundColor
    });
  };
}( jQuery ));
