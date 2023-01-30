$(document).ready(function(){
    $(".saveBtn").on("click", function(){
        console.log('saved');

        let time = $(this).parent().attr("id")
        console.log(time);
        let input = $(this).siblings('.content').val();
        console.log(input);

        localStorage.setItem(time, input);

        $('.notification').addClass('show');

        setTimeout(function(){
            $('.notification').removeClass('show');
        }, 3000)
    })

    $(".clearBtn").on("click", function () {
		let activity = $(this).parent().find("content").text();
		localStorage.removeItem(activity);
		$(this).parent().find(".content").val("");
	});

    function hourUpdate(){
        let currentHour = moment().hours();

        for (let i = 0; i < $('.time-block').length; i++){
            let hour = parseInt($('.time-block')[i].getAttribute('id').split('-')[1])

            if (hour-1 < currentHour) {
                $('.time-block')[i].classList.add('past')
            } else if(hour === currentHour) {
                $('.time-block')[i].classList.add('past')
                $('.time-block')[i].classList.remove('present')
            } else {
                $('.time-block')[i].classList.remove('past')
                $('.time-block')[i].classList.remove('present')
                $('.time-block')[i].classList.remove('future')
            }
        }
    
    }

    for(i = 0; i < localStorage.length; i++){
		let time = localStorage.key(i);
		let event = localStorage.getItem(time);
		$(`[id='${time}']`).closest('.row').find('.content').val(event);
	}

    hourUpdate();

    let interval = setInterval(hourUpdate, 15000);

    $('#currentDay').text(moment().format("ddd, hA"));
});