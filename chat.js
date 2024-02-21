let mockChat = {
	instances: Object,
	init(args){

		/*
		 * DEFAULT PARAMETERS
		 */
		let params = {
			id: args.id ? args.id : 'mockChat',
			data: args.data ? args.data : ['Pas de données'],
			delay: args.delay ? args.delay : 1300,
			startDelay: args.startDelay ? args.startDelay : 1050,
			restartDelay: args.restartDelay ? args.restartDelay : 2000,
			loop : args.loop ? args.loop : false,
		}

		/*
		 * CREATE MARKUP
		 */

		let mockChatContainer = document.querySelector('#'+ params.id)
			mockChatContainer.innerHTML = `
				<div class="device">
                    <h1 style="    position: absolute;
    top: 10px;
    left: 135px;">Jean</h1>
    
					<div class="screen">
						<div class="app">
						</div>
					</div>
				</div>
			`
		mockChatContainer.classList.add('mockchat')
		/*
		 * TEMPLATES
		 */

		let reply = function (content) {
			let el = document.createElement('div')
			let text = document.createTextNode(content)
			el.classList.add('reply')
			el.appendChild(text)
			return el
		}

		let replyDots = function () {
			const dot1 = document.createElement('span')
			const dot2 = document.createElement('span')
			const dot3 = document.createElement('span')
			let el = document.createElement('div')
			el.appendChild(dot1)
			el.appendChild(dot2)
			el.appendChild(dot3)
			el.classList.add('dots', 'reply')
			return el
		}


		const chatScreen = mockChatContainer.querySelector('.app');
		function draw(data) {
			chatScreen.innerHTML = ''
			chatScreen.appendChild(replyDots());
			setTimeout( function() {
				chatScreen.innerHTML = ''
			}, params.startDelay)
			for( i=0 ; i < data.length ; i++) {
				let key = i;
				setTimeout(function() {
					chatScreen.appendChild(reply(data[key]));
				}, params.startDelay + i * params.delay)
			}
		}

		if(params.loop) {
			draw(params.data);

			this.instances[params.id] = setInterval( function() {
				draw(params.data)
			}, params.restartDelay + params.delay * params.data.length + 200)
			

		} else { 
			draw(params.data);
		}

	},
  
	stop(id) {
		clearInterval(this.instances[id])
	},

}