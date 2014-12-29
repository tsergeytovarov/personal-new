/*=================================
	Анимация svg иконок на главной
=================================*/

// функция рисовальщик
function draw_path(path, colored){
	var path = document.querySelector(path);
	var length = path.getTotalLength();
	// Clear any previous transition
	path.style.transition = path.style.WebkitTransition =
	  'none';

	// Trigger a layout so styles are calculated & the browser
	// picks up the starting position before animating
	path.getBoundingClientRect();
	// Define our transition
	path.style.transition = path.style.WebkitTransition =
	  'all 1s ease-in-out';
	// Go!
	path.style.strokeDashoffset = '0';

	setTimeout( function(){
		path.style.fill = colored;
	} , 700);
}

/* функция стиральщик - если пригодится */

function remove_path(path){
	var path = document.querySelector(path);
	var length = path.getTotalLength();
	path.style.strokeDashoffset = length;
	path.style.fill = "none";
}

// перед началом работы скроем все наши строки
var paths = document.querySelectorAll(".main-page-layout svg path");

for (var i = 0; i < paths.length; i++) {
	var length = paths[i].getTotalLength();
	paths[i].style.strokeDasharray = length + ' ' + length;
	paths[i].style.strokeDashoffset = length;
};


// вызов функций по событиям
// для верхней кнопки
var top_svg = document.querySelectorAll(".js-top-svg");

top_svg[0].addEventListener("mouseover", function(event) {

    draw_path(".path-1", "#dcdcdc");
	draw_path(".path-2", "#dcdcdc");
	draw_path(".path-3", "#dcdcdc");
	draw_path(".path-4", "#dcdcdc");

});

// для нижней кнопки
var bottom_svg = document.querySelectorAll(".js-bottom-svg");

bottom_svg[0].addEventListener("mouseover", function(event) {

    draw_path(".path-5", "#333");
	draw_path(".path-6", "#333");
	draw_path(".path-7", "#333");

});

/* Функции стиральщики по отводу отрабатывает под display: none */

top_svg[0].addEventListener("mouseleave", function(event) {

    remove_path(".path-1");
	remove_path(".path-2");
	remove_path(".path-3");
	remove_path(".path-4");

});

bottom_svg[0].addEventListener("mouseleave", function(event) {

    remove_path(".path-5");
	remove_path(".path-6");
	remove_path(".path-7");

});