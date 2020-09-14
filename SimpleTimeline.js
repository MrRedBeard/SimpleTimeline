

//simpleTimeline .year 
//Year loop through years then add blocks
//Loop through year blocks to get months then add blocks to years


//simpleTimeline
//timeline
//year (column)
//entry (entries on column/year)

class SimpleTimeline
{
	constructor(options)
	{
		if(!options)
		{
			throw 'SimpleTimeline.js: options must be defined';
		}
		
		this.data = options.data;
		
		this.containerEl = options.containerEl;
		this.topBarEl;
		this.bottomBarEl;
		this.timelineEl;
		this.yearTemplate;
		this.entryTemplate;
		
		this.buildTemplate();

		this.buildYears();
		this.buildEntries();
	}
	
	buildTemplate()
	{
		let elm = document.createElement('div');
		let elmStr = '<div class="topBar"></div>' + '\n';
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
		elmStr += '<div class="bottomBar"></div>' + '\n';
		elm.innerHTML = elmStr;

		this.topBarEl = document.createElement('div');
		this.topBarEl.innerHTML = elm.querySelector('.topBar').outerHTML;
		this.topBarEl = this.topBarEl.querySelector('.topBar');

		this.bottomBarEl = document.createElement('div');
		this.bottomBarEl.innerHTML = elm.querySelector('.bottomBar').outerHTML;
		this.bottomBarEl = this.bottomBarEl.querySelector('.bottomBar');
		
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
		
		this.containerEl.appendChild(this.topBarEl);
		this.containerEl.appendChild(this.timelineEl);
		this.containerEl.appendChild(this.bottomBarEl);
	}
	
	buildYears()
	{
		let years = [];
		for (var i = 0; i < this.data.length; i++)
		{
			years.push(this.data[i].year);
		}
		years = years.sort();

		for (var i = 0; i < years.length; i++)
		{
			let yearContainer = document.createElement('div');
			yearContainer.innerHTML = this.yearTemplate.outerHTML;
			yearContainer = yearContainer.querySelector('.year');
			yearContainer.innerHTML = '<h1 class="yearTitle">1990</h1>';
			yearContainer.querySelector('.yearTitle').innerHTML = 'Year ' + years[i];
			yearContainer.classList.add('year' + years[i]);

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
			if (x.order !== null && y.order !== null)
			{
				return x.order - y.order;
			}
		});

		this.data.sort(function (x, y)
		{
			if (x.day !== null && y.day !== null)
			{
				return x.day - y.day;
			}
        });

		this.data.sort(function (x, y)
		{
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

			let date = [this.data[i].month, this.data[i].day, this.data[i].year].filter(Boolean).join('/');
			entry.querySelector('h1').innerHTML = date;

			entry.querySelector('h2').innerHTML = '';

			entry.querySelector('.content').innerHTML = '<p>' + this.data[i].title + '<br /><br />' + this.data[i].content + '</p>';

			this.timelineEl.querySelector('.year' + this.data[i].year).appendChild(entry);
		}
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