# spoiler

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

## 05. Create and spoiler tag that:
	1. Text should be visible if highlighted. 
	2. Text should be completely replaced and unaccessible (censored).

### Usage
For version 1 simply add the spoiler attribute to your content
Example:
<p>
    Who kills Dumbledor? 
    <span spoiler> Snape did!</span>
</p>


For version 2, set the spoiler tag to censor:
<p>
    Who kills Dumbledor? 
    <span spoiler='censor'> Snape did!</span>
</p> 

### Styling
The directive will add the .spoiler-alert class to the element displaying 
the "spoiler..." text.

In addition to the .spoiler-alert class, we will also add ".spoiler-removed" when 
spoiler="censor".

When using spoiler (with no censor) the ".spoiler-hidden" class is added to the "spoiler..."
text.

### Possible improvements
Let the programmer decide which string to use for "spoiler completely removed" and
"spoiler hidden".

### Problems found during development
One of the requirements was that the are where the spoiler should go must
be kept, this can be easily achieved by using the "visibility: hidden" CSS,
however, once invisible you can't hover things, the fix was to actually
add the event to the parent element containing the spoiler.

Attaching the .hover() method on the directive's element:
This method takes two functions as parameters, one for mouseenter, one for mouseleave,
the problem is that the scope isn't updated inside those functions, in this case, we have:
	$animate.addClass(element, 'spoiler');

Which results in not having our classes added to our element. It was fixed by calling 
scope.$apply inside each callback function from the .hover() method. Although at the end
we've removed this completely and replaced it with a normal CSS transition using 
element.css();



