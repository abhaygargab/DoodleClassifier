function go()
{
//	cnv.resize(28,28);
//	background(0);
	let inputs = [];
	let img = get();
	img.resize(28,28);
	console.log(img);
	img.loadPixels();
	for(let i = 0; i < len; i++)
	{
		let bright = img.pixels[i * 4];
		inputs[i] = bright/255.0;
	}
	console.log(inputs);
	let guess = nn.feedforward(inputs);
	let high = max(guess);
	let classification = guess.indexOf(high);
	if(classification === 0)
	{
		console.log("CAT");
	}
	else if(classification === 1)
	{
		console.log("RAINBOW");	
	}
	else if(classification === 2)
	{
		console.log("TRAIN");
	}
}

function mouseDragged()
{
	stroke(255);
	strokeWeight(4);
	line(pmouseX,pmouseY,mouseX,mouseY);
}


function prepareData(category,data,label)
{
	category.training = [];
	category.testing = [];
//	console.log(data);
	for(let i=0; i<total_data; i++)
	{
		let offset = len * i;
		let threshold = floor(0.8*total_data);
		if(i < threshold)
		{
			category.training[i] = data.bytes.subarray(offset, offset + len);
			category.training[i].label = label;
		}
		
		else
		{
			category.testing[i - threshold] = data.bytes.subarray(offset, offset + len);	
			category.testing[i - threshold].label = label;
		}

	}
}


function train()
{
	shuffle(training, true);
	let inputs = [];
	for(let i = 0; i< training.length; i++)
	{
		let data = training[i];
		for(let j = 0; j < len; j++)
			inputs[j] = data[j]/255;

		let label = training[i].label;
		let targets = [0,0,0];
		targets[label] = 1;
		nn.train(inputs,targets);
	}
	console.log("TrainedEpoch: " + ++count);
}

function test()
{
	let correct = 0;
	let inputs = [];
	for(let i = 0; i< testing.length; i++)
	{
		let data = testing[i];

		for(let j = 0; j < len; j++)
			inputs[j] = data[j]/255;

		let label = testing[i].label;
		let ans = predict(inputs);
		if(ans===label)
			correct++;
	}

	let percent = correct/testing.length;
	console.log(percent);
}



function predict(inputs)
{
	let guess = nn.feedforward(inputs);
	let high = max(guess);
	let classification = guess.indexOf(high);
	return classification;
}


function drawImage()
{
		// let total = 100;
	// for(var n = 0; n<total; n++)
	// {
	// 	let img = createImage(28,28);
	// 	img.loadPixels();
	// 	let offset = 784 * n;
	// 	for(var i=0; i<784; i++)
	// 	{
	// 		let val = 255 - cats_data.bytes[i + offset];
	// 		img.pixels[i * 4 + 0] = val;
	// 		img.pixels[i * 4 + 1] = val;
	// 		img.pixels[i * 4 + 2] = val;
	// 		img.pixels[i * 4 + 3] = 255;
	// 	}
	// 	img.updatePixels();
	// 	let x = (n % 10)*28;
	// 	let y = floor(n / 10)*28;
	// 	image(img, x, y);
	// }
}


function check(data)
{
	console.log("Wolla");
//	console.log(data);
}

function clearIt()
{
//	createCanvas(280,280);
	background(0);
//	background(0);
}