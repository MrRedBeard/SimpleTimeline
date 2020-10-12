class SimpleTimeline
{
	constructor(options)
	{
		if(!options)
		{
			throw 'SimpleTimeline.js: options must be defined';
		}
		
		this.data = options.data;
		
		this.yearsArry = [];
		this.currentYearPosition = 0; //Probably overkill on error prevention
		
		this.containerEl = options.containerEl;
		this.yearFilterEl;
		this.yearFilterYearsEl;
		this.topBarEl;
		this.bottomBarEl;
		this.timelineEl;
		
		this.bottomBarNavBackEl;
		this.bottomBarNavForwardEl;
		
		this.yearTemplate;
		this.entryTemplate;
		
		this.buildTemplate();

		this.buildYears();
		this.buildEntries();
		
		this.createEvents();
	}
	
	buildTemplate()
	{
		let elm = document.createElement('div');
		let elmStr = '<div class="yearFilter"><div class="menuIcon"></div><div class="years"></div></div>' + '\n';
		elmStr += '<div class="topBar"></div>' + '\n';
		elmStr += '<div class="timeline">' + '\n';
		elmStr += '  <div class="year">' + '\n';
		elmStr += '    <h1 class="yearTitle">1990</h1>' + '\n';
		elmStr += '    <div class="entry">' + '\n';
		elmStr += '      <h1>3/1/20</h1>' + '\n';
		elmStr += '      <h2>Entry Title</h2>' + '\n';
		elmStr += '      <div class="content">Content</div>' + '\n';
		//elmStr += '      <img src="http://dummyimage.com/300x200/000/fff" />' + '\n';
		//elmStr += '      <p>Heres the info about this date</p>' + '\n';
		elmStr += '    </div>' + '\n';
		elmStr += '  </div>' + '\n';
		elmStr += '</div>' + '\n';
		elmStr += '<div class="bottomBar"><div class="navButtons"><span class="back"></span><span class="forward"></span></div></div>' + '\n';
		elm.innerHTML = elmStr;
		
		this.yearFilterEl = document.createElement('div');
		this.yearFilterEl.innerHTML = elm.querySelector('.yearFilter').outerHTML;
		this.yearFilterEl = this.yearFilterEl.querySelector('.yearFilter');
		this.yearFilterYearsEl = this.yearFilterEl.querySelector('.years');

		this.topBarEl = document.createElement('div');
		this.topBarEl.innerHTML = elm.querySelector('.topBar').outerHTML;
		this.topBarEl = this.topBarEl.querySelector('.topBar');

		this.bottomBarEl = document.createElement('div');
		this.bottomBarEl.innerHTML = elm.querySelector('.bottomBar').outerHTML;
		this.bottomBarEl = this.bottomBarEl.querySelector('.bottomBar');
		
		this.bottomBarNavBackEl = this.bottomBarEl.querySelector('.back');
		this.bottomBarNavForwardEl = this.bottomBarEl.querySelector('.forward');

		this.timelineEl = document.createElement('div');
		this.timelineEl.innerHTML = elm.querySelector('.timeline').outerHTML;
		this.timelineEl = this.timelineEl.querySelector('.timeline');
		this.timelineEl.innerHTML = '';

		this.yearTemplate = document.createElement('div');
		this.yearTemplate.innerHTML = elm.querySelector('.year').outerHTML;
		this.yearTemplate = this.yearTemplate.querySelector('.year');
		this.yearTemplate.innerHTML = '';
		
		this.entryTemplate = document.createElement('div');
		this.entryTemplate.innerHTML = elm.querySelector('.entry').outerHTML;
		this.entryTemplate = this.entryTemplate.querySelector('.entry');
		
		this.containerEl.appendChild(this.yearFilterEl);
		this.containerEl.appendChild(this.topBarEl);
		this.containerEl.appendChild(this.timelineEl);
		this.containerEl.appendChild(this.bottomBarEl);
	}
	
	createEvents()
	{
		this.yearFilterEl.querySelector(".menuIcon").onclick = () => this.expandYearFilter();
		this.bottomBarNavBackEl.onclick = () => 
			{
				let currentYear = window.location.href;
		
				if(currentYear.includes('#'))
				{
					currentYear = parseInt(currentYear.split('#')[1].replace('year', ''));					
					this.currentYearPosition = this.yearsArry.indexOf(currentYear);
				}				
				
				let x = this.yearsArry.length - 1;
				if(this.currentYearPosition - 3 >= 0)
				{
					x = this.currentYearPosition - 3
				}
				
				this.goto(x);
			};
		this.bottomBarNavForwardEl.onclick = () => 
			{ 
				let currentYear = window.location.href;
			
				if(currentYear.includes('#'))
				{
					currentYear = parseInt(currentYear.split('#')[1].replace('year', ''));					
					this.currentYearPosition = this.yearsArry.indexOf(currentYear);
				}
				
				let x = 0;
				if(this.currentYearPosition + 3 <= this.yearsArry.length - 1)
				{
					x = this.currentYearPosition + 3
				}
				
				this.goto(x);
			};
	}
	
	buildYears()
	{
		this.yearsArry = [];
		for (var i = 0; i < this.data.length; i++)
		{
			if (!this.yearsArry.includes(this.data[i].year))
            {
				this.yearsArry.push(this.data[i].year); //Remove duplicate years
            }
		}
		this.yearsArry = this.yearsArry.sort();
		
		this.yearFilterYearsEl.innerHTML = '';
		this.yearsArry.map(y=>
		{
			let el = document.createElement("a");
			el.setAttribute("href",`#year${y}`);
			el.innerHTML = y;
			this.yearFilterYearsEl.appendChild(el);
		});

		for (var i = 0; i < this.yearsArry.length; i++)
		{
			let yearContainer = document.createElement('div');
			yearContainer.innerHTML = this.yearTemplate.outerHTML;
			yearContainer = yearContainer.querySelector('.year');
			yearContainer.innerHTML = '<h1 class="yearTitle">1990</h1>';
			yearContainer.querySelector('.yearTitle').innerHTML = 'Year ' + this.yearsArry[i];
			yearContainer.classList.add('year' + this.yearsArry[i]);
			yearContainer.id = 'year' + this.yearsArry[i];

			this.timelineEl.appendChild(yearContainer);
        }
	}
	
	buildEntries()
	{
		//this.entryTemplate
		//<h1>3/1/20</h1>
		//<h2>Entry Title</h2>
		//<div class="content"></div>
		//this.timelineEl.querySelector('.year').appendChild(this.entryTemplate);

		this.data.sort(function (x, y) 
		{
			//This is the sort issue need to refactor this later
			//if (x.order !== null && y.order !== null) 
			//{
			//	return x.order - y.order;
			//}
			
			if (x.day !== null && y.day !== null) 
			{
				return x.day - y.day;
			}
			
			if (x.month !== null && y.month !== null) 
			{
				return x.month - y.month;
			}
		});

		for (var i = 0; i < this.data.length; i++)
		{
			let entry = document.createElement('div');
			entry.innerHTML = this.entryTemplate.outerHTML;
			entry = entry.querySelector('.entry');

			let id = [this.data[i].year, this.data[i].month, this.data[i].day].filter(Boolean).join('');
			entry.id = id;

			let date = [this.data[i].month, this.data[i].day, this.data[i].year].filter(Boolean).join('/');
			entry.querySelector('h1').innerHTML = date;

			entry.querySelector('h2').innerHTML = '';

			entry.querySelector('.content').innerHTML = '<p>' + this.data[i].title + '<br /><br />' + this.data[i].content + '</p>';

			this.timelineEl.querySelector('.year' + this.data[i].year).appendChild(entry);
		}
	}
	
	expandYearFilter()
	{		
		this.yearFilterYearsEl.classList.contains('expanded')

		if(!this.yearFilterYearsEl.classList.contains('expanded'))
		{
			this.yearFilterYearsEl.classList.add('expanded');
			
			this.yearFilterEl.querySelector(".menuIcon").classList.add('close');
		}
		else 
		{
			this.yearFilterYearsEl.classList.remove('expanded');
			
			this.yearFilterEl.querySelector(".menuIcon").classList.remove('close');
		}
	}
	
	goto(num)
	{
		//#year2152
		let url = window.location.href;
		
		if(url.includes('#'))
		{
			url = url.split('#')[0];
		}
		
		url = '#year' + this.yearsArry[num];
		
		this.currentYearPosition = num;
		
		window.location.href = url;
	}
}


//class clsSimpleTimelineData
//{
//	constructor()
//	{
//		this.year = 0;
//		this.month = 0;
//		this.day = 0;
//		this.order = 0;
//		this.title = '';
//		this.content = '';
//	}
//}

//JSON.stringify(obj);
//JSON.parse()
//Data from https://bobiverse.fandom.com/wiki/Timeline