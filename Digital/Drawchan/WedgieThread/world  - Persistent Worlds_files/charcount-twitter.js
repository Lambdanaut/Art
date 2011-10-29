var LabelCounter = 0;

function parseCharCounts()
{
	//Get Everything...
	var elements = document.getElementsByTagName('textarea');
	var element = null;
	var mexlength = 9;
	var newlabel = null;
	
	for(var i=0; i < elements.length; i++)
	{
		element = elements[i];
		
		if(element.getAttribute('mexlength') != null && element.getAttribute('limiterid') == null)
		{
			mexlength = element.getAttribute('mexlength');
			
			//Create new label
			newlabel = document.createElement('label');
			newlabel.id = 'limitlbl_' + LabelCounter;
			newlabel.className = 'twt9';
			newlabel.style.display = 'block'; //Make it block so it sits nicely.
			newlabel.innerHTML = "Updating...";
			
			//Attach limiter to our textarea
			element.setAttribute('limiterid', newlabel.id);
			element.onkeyup = function(){ displayCharCounts(this); };
			
			//Append element
			element.parentNode.insertBefore(newlabel, element);
			
			//Force the update now!
			displayCharCounts(element);
		}
		
		//Push up the number
		LabelCounter++;
	}
}

function displayCharCounts(element)
{
	var limitLabel = document.getElementById(element.getAttribute('limiterid'));
	var mexlength = element.getAttribute('mexlength');
	var enforceLength = false;
	
	//Replace \r\n with \n then replace \n with \r\n
	//Can't replace \n with \r\n directly because \r\n will be come \r\r\n

	//We do this because different browsers and servers handle new lines differently.
	//Internet Explorer and Opera say a new line is \r\n
	//Firefox and Safari say a new line is just a \n
	//ASP.NET seems to convert any plain \n characters to \r\n, which leads to counting issues
	var value = element.value.replace(/\u000d\u000a/g,'\u000a').replace(/\u000a/g,'\u000d\u000a');
	var currentLength = value.length;
	var remaining = 0;
	
	if(mexlength == null || limitLabel == null)
	{
		return false;
	}
	remaining = mexlength - currentLength;
	
	if(remaining >= 20)
	{
		limitLabel.className = 'twt140';
		limitLabel.innerHTML = remaining;
	}
	else
	{
		if(remaining >= 10)
		{
			limitLabel.className = 'twt19';
			limitLabel.innerHTML = remaining;
		}
		else
		{
			if(remaining >= 0)
			{
				limitLabel.className = 'twt9';
				limitLabel.innerHTML = remaining;
			}
			else
			{
			//Non-negative
			remaining = Math.abs(remaining);
			
			limitLabel.className = 'twt9';
			limitLabel.innerHTML = '-' + remaining + '';
			}

		}
	}
}

//Go find our textareas with mexlengths and handle them when we load!
parseCharCounts();