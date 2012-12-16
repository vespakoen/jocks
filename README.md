# Jocks - Javascript Blocks

## What

Predefined blocks of HTML, created in Javascript, that have their own helper methods.


## Why?

We used to let the server respond some HTML to the browser, and that was the end of it.
But then Javascript and front-end frameworks took off, and we let them take care of rendering our views.
This is nice, no more unneccesary requests! Oh and we can easily rerender our view when something changed.
But let's be honest, those views are ugly too (you've seen it before: <%= something.get("is_active") ? ' class="active"' : '' %>")
and sometimes a complete re-render is not what you want, so you scan through the DOM with document.getElementById('some-element') or $('#some-element'), and manipulate that element.
Those days are over now too, thanks to Jocks.

Jocks keeps a reference to all DOM elements within a block, allowing for easy modification later.
We can even add handy methods to our blocks to manipulate the DOM elements easily.

Jock blocks can easily be nested, and if you have a bunch of HTML that you don't wan't / need "block-i-fied", you can still use a simple template.


## Who?

The Jocks project is created and maintained by Koen Schmeets / @vespakoen / hello@koenschmeets.nl.
Originally created for the Trapps mobile application (www.trapps.nl)