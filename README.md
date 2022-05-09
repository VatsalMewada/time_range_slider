# Time Range Slider

Time Range Slider makes it easier to handle time ranges.

## Prerequisites

This package depends on jQuery, so it's most useful in a project where you are already using jQuery.

## Installation

Inside your project environment in your terminal run the following:

```bash
npm i @vatsalmewada/time_range_slider
```

then you should add

    require("jquery")
    require("@vatsalmewada/time_range_slider")

## Basic Usage

Suppose you have a `div` element with class `time_range_slider`:
```html
<div class='time_range_slider'></div>
```

to apply this plugin on your div, you need to add following line to your script:
```javascript
$('.time_range_slider').time_range_slider();
```
Your div will look something like this

![Applied time range slider on div](https://www.linkpicture.com/q/Screenshot-from-2022-05-08-12-43-51.png)

Now, to show the values of this range slider we need two textboxes. One is for Start time and another for End time.

```html
<div class='time_range_slider'></div>

<input type="text" class="start_time_input"/>
<input type="text" class="end_time_input"/>
```

and then apply time_range_slider,

```javascript
$('.time_range_slider').time_range_slider();
```

![Applied time range slider on div](https://www.linkpicture.com/q/Screenshot-from-2022-05-09-10-37-19.png)


## Plugin Properties

Name |	Description 
-----------------|------
main_sel    | To put custom class name as a selector for `main div`	
start_time_sel    | To put custom class name as a selector for `start_time input`	
end_time_sel    | To put custom class name as a selector for `end_time input`	
start_time    | To put default start_time. e.g. `6:30`	
end_time    | To put default end_time. e.g. `17:00`	  

## Examples

```javascript
$( ".vatsal" ).time_range_slider({
    main_sel: '.vatsal',                 // For custom `main div`
    start_time_sel: '.start_time_input', // For custom `start_time input`
    end_time_sel: '.end_time_input',     // For custom `end_time input`
    start_time: '6:30',                  // For custom `start_time`
    end_time: '17:00',                   // For custom `end_time`
});
```

## Copyright

Copyright (c) 2022 Vatsal Mewada. See LICENSE for details.

