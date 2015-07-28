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
