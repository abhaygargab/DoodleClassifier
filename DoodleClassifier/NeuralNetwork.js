console.log("HeyHey");

function sigmoid(x)
{
	return 1/(1+Math.exp(-x));
}
function d_sigmoid_o(x)
{
	return x*(1-x);
}

function d_sigmoid_h(x)
{
	let a = sigmoid(x);
	return a*(1-a);
}

class NeuralNetwork
{
	constructor(input,hidden,output)
	{
		this.input = new matrix(input,1);
		this.hidden = new matrix(hidden,1);
		this.output = new matrix(output,1);
		this.lr = 0.01;

		this.weights_ih = new matrix(hidden,input);
		this.weights_ho = new matrix(output,hidden);

		this.bias_h = new matrix(hidden,1);
		this.bias_o = new matrix(output,1);
	
		this.weights_ih.randomize();
		this.weights_ho.randomize();
		this.bias_h.randomize();
		this.bias_o.randomize();


	}
	
	feedforward(input)
	{
		this.input=matrix.fromArray(input);
	//	console.table(this.input.m);
		this.hidden = matrix.addMatrices(matrix.multiply(this.weights_ih,this.input), this.bias_h);
		this.hidden.apply(sigmoid);
		this.output = matrix.addMatrices(matrix.multiply(this.weights_ho,this.hidden), this.bias_o);
		this.output.apply(sigmoid);
	//	console.table(this.hidden.m);
	//	console.table(this.output.m);
		return this.output.toArray();
	}

	train(inputs,targets)
	{
		let outputs = this.feedforward(inputs);
		targets = matrix.fromArray(targets);
		outputs = matrix.fromArray(outputs);
		let errors_output = matrix.subtract(targets,outputs);
		let errors_hidden = matrix.multiply(matrix.transpose(this.weights_ho),errors_output);
	//	console.table(targets.m);
	//	console.table(outputs.m);
		
	//	console.table(errors_hidden.m);
		let d_o = matrix.apply(d_sigmoid_o,outputs);
		let d_h = matrix.apply(d_sigmoid_o,this.hidden);
		
	//	Adjusting the weights and biases
		let delta_weights_ho = matrix.multiply((matrix.multiply_ew(errors_output,d_o)),matrix.transpose(this.hidden));
		delta_weights_ho.multiplyElements(this.lr);
		let delta_bias_o = matrix.multiply_ew(errors_output,d_o);
		delta_bias_o.multiplyElements(this.lr);
		
		let delta_weights_ih = matrix.multiply((matrix.multiply_ew(errors_hidden,d_h)),matrix.transpose(this.input));
		delta_weights_ih.multiplyElements(this.lr);
		let delta_bias_h = matrix.multiply_ew(errors_hidden,d_h);
		delta_bias_h.multiplyElements(this.lr);
		
		this.weights_ho = matrix.addMatrices(this.weights_ho,delta_weights_ho);
		this.bias_o = matrix.addMatrices(this.bias_o,delta_bias_o);

		this.weights_ih = matrix.addMatrices(this.weights_ih,delta_weights_ih);
		this.bias_h = matrix.addMatrices(this.bias_h,delta_bias_h);
	//	console.table(delta_bias_o.m);
	//	console.table(delta_bias_h.m);
	}
}	