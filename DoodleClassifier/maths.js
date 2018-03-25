console.log("Hey");
class matrix
{

	constructor(rows,cols)
	{
		this.cols=cols;
		this.rows=rows;
		this.m=[];
		for(var i=0;i<this.rows;i++)
		{
			this.m[i]=[];
			for(var j=0;j<this.cols;j++)
			{
				this.m[i][j]=0;
			}
		}
			
	}
	
	print()
	{
		console.table(this.m);	
	}
	randomize()
	{
		for(var i=0;i<this.rows;i++)
			for(var j=0;j<this.cols;j++)
				this.m[i][j]=(2*Math.random())-1;
	//	console.table(this.m);	
	}

	static fromArray(a)
	{
		let z = new matrix(a.length,1);
		for(var i=0;i<a.length;i++)
			z.m[i][0] = a[i]; 
	//	console.table(a);
		return z;
	}
	toArray()
	{
		let arr = [];
		for(var i=0;i<this.rows;i++)
			for(var j=0;j<this.cols;j++)
				arr.push(this.m[i][j]);
		return arr;
	}

	static multiply(a,b)
	{
		var z = new matrix(a.rows,b.cols);
			for(var i=0;i<a.rows;i++)
				for(var j=0;j<b.cols;j++)
				{
					z.m[i][j]=0;
					for(var k=0;k<a.cols;k++)
					{
						z.m[i][j]+=a.m[i][k]*b.m[k][j];			
					}
				} 
		return z;
	}
	static transpose(a)
	{
		let k = new matrix(a.cols,a.rows);
		for(let i=0;i<a.rows;i++)
			for(let j=0;j<a.cols;j++)
				k.m[j][i]=a.m[i][j];
		return k;
	}
	static addMatrices(a,b)
	{
	//	if(a instanceof matrix)
	//	{
		let k = new matrix(a.rows,a.cols);
			for(var i=0;i<a.rows;i++)
				for(var j=0;j<a.cols;j++)
						k.m[i][j]=a.m[i][j]+b.m[i][j];
	//	}
		// for(var i=0;i<a.rows;i++)
		// 		for(var j=0;j<a.cols;j++)
		// 				console.log(k.m[i][j]);
	//	console.log(k);
		return k;
	}
	static subtract(a,b)
	{
		let z= new matrix(a.rows,a.cols);
		for(var i=0;i<a.rows;i++)
			for(var j=0;j<a.cols;j++)
				z.m[i][j]=a.m[i][j]-b.m[i][j];
		return z;	
	}
	multiplyElements(x)
	{
		for(var i=0;i<this.rows;i++)
			for(var j=0;j<this.cols;j++)
				this.m[i][j]=x*this.m[i][j];
	}
	static multiply_ew(a,b)
	{
		let z = new matrix(a.rows,a.cols);
		for(var i=0;i<a.rows;i++)
			for(var j=0;j<a.cols;j++)
				z.m[i][j]=a.m[i][j]*b.m[i][j];
		return z;	
	}

	apply(func)
	{
		for(var i=0;i<this.rows;i++)
			for(var j=0;j<this.cols;j++)
				this.m[i][j]=func(this.m[i][j]);
	}
	static apply(func,a)
	{
		let z= new matrix(a.rows,a.cols);
		for(var i=0;i<a.rows;i++)
			for(var j=0;j<a.cols;j++)
				z.m[i][j]=func(a.m[i][j]);
		//console.table(z.m);
		return z;
	}
}