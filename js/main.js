(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });


    // Testimonials carousel
    $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });

    
})(jQuery);
const slider = document.querySelector('.video-slider');
const videoItems = document.querySelectorAll('.video-item video');  // Get all video elements
let currentIndex = 0;
let sliderInterval;

// Function to move the slider
function moveSlider() {
    if (currentIndex < videoItems.length - 10) {
        currentIndex++;
    } else {
        currentIndex = 0;  // Reset to the first slide if it reaches the end
    }
    updateSliderPosition();
}

// Function to update the slider position
function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * 25}%)`;  // Adjust for 4 items per slide
}

// Function to check if any video is playing
function checkVideoStatus() {
    let isAnyVideoPlaying = false;

    videoItems.forEach(video => {
        if (!video.paused) {
            isAnyVideoPlaying = true;  // If any video is playing, set this to true
        }
    });

    if (isAnyVideoPlaying) {
        clearInterval(sliderInterval);  // Pause the carousel if any video is playing
    } else {
        sliderInterval = setInterval(moveSlider, 8000);  // Restart the carousel every 3 seconds if no video is playing
    }
}

// Pause all videos when a new video is played
videoItems.forEach(video => {
    video.addEventListener('play', () => {
        // Pause other videos when a new video starts playing
        videoItems.forEach(v => {
            if (v !== video && !v.paused) {
                v.pause();  // Pause the other videos
            }
        });
    });
});

// Set an interval to check the video status every second
setInterval(checkVideoStatus, 6000);

// Initially start the carousel movement
sliderInterval = setInterval(moveSlider, 6000);  // Move the carousel every 3 seconds
