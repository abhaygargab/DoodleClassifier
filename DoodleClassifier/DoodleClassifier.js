const len = 784;
const total_data = 1000;

const CAT = 0;
const RAINBOW = 1;
const TRAIN = 2;

let cats_data;
let trains_data;
let rainbows_data;
let random_data;

let cats = {};
let trains = {};
let rainbows = {};

let training = [];
let testing = [];

let nn;

let cnv;
let button_test;
let button_train;
let button_guess;
let button_clear;

let count = 0;

function preload()
{
	cats_data = loadBytes('data/cats1000.bin',check);
	rainbows_data = loadBytes('data/rainbows1000.bin',check);
	trains_data = loadBytes('data/trains1000.bin',check);
}

function setup()
{	
	cnv = createCanvas(280,280);
	background(0);
	 	
	nn = new NeuralNetwork(784,100,3);
	 	
	prepareData(cats, cats_data, CAT);
	prepareData(rainbows, rainbows_data, RAINBOW);
	prepareData(trains, trains_data, TRAIN);

	training = training.concat(cats.training);
	training = training.concat(rainbows.training);
	training = training.concat(trains.training);	
	//console.log(training);

	testing = testing.concat(cats.training);
	testing = testing.concat(rainbows.training);
	testing = testing.concat(trains.training);	
	
	button_train = createButton('TRAIN');
	button_train.position(10,300);
	button_train.mousePressed(train);	

	button_test = createButton('TEST');
	button_test.position(220,300);
	button_test.mousePressed(test);

	button_guess = createButton('GUESS');
	button_guess.position(120,300);
	button_guess.mousePressed(go);

	button_clear = createButton('CLEAR');
	button_clear.position(120,350);
	button_clear.mousePressed(clearIt);
	// for(let i =0; i < 5; i++ )
	// {
	// 	train();
	// 	console.log("Trained :" + i);

	// }

}



function draw()
{

}

