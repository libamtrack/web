export default function AT_effective_charge_from_beta(parameters) {
	let at_effective_charge_from_beta = Module.cwrap('AT_effective_charge_from_beta', 'number', ['number', 'array', 'array', 'number']);

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.n){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER n IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let n = parameters.n;

	/*********************INPUT ARRAY********************************/
	if(!parameters.beta){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER beta IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let beta = parameters.beta;
	let betaData = new Float64Array(beta);
	let betaDataBytesNumber = betaData.length * betaData.BYTES_PER_ELEMENT;
	let betaDataPointer = Module._malloc(betaDataBytesNumber);
	let betaHeap = new Uint8Array(Module.HEAPF64.buffer, betaDataPointer, betaDataBytesNumber);
	betaHeap.set(new Uint8Array(betaData.buffer));

	/*********************INPUT ARRAY********************************/
	if(!parameters.Z){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER Z IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let Z = parameters.Z;
	let ZData = new Int32Array(Z);
	let ZDataBytesNumber = ZData.length * ZData.BYTES_PER_ELEMENT;
	let ZDataPointer = Module._malloc(ZDataBytesNumber);
	let ZHeap = new Uint8Array(Module.HEAP32.buffer, ZDataPointer, ZDataBytesNumber);
	ZHeap.set(new Uint8Array(ZData.buffer));

	/*********************OUTPUT ARRAY*******************************/
	let effective_chargeReturnData = new Float64Array(new Array(n));
	let effective_chargeReturnDataBytesNumber = effective_chargeReturnData.length * effective_chargeReturnData.BYTES_PER_ELEMENT;
	let effective_chargeReturnDataPointer = Module._malloc(effective_chargeReturnDataBytesNumber);
	let effective_chargeReturnHeap = new Uint8Array(Module.HEAPF64.buffer, effective_chargeReturnDataPointer, effective_chargeReturnDataBytesNumber);

	/*********************CALL FUNCTION******************************/
	let result = at_effective_charge_from_beta(n, betaHeap, ZHeap, effective_chargeReturnHeap.byteOffset);
	let resultFromArray = new Float64Array(effective_chargeReturnHeap.buffer, effective_chargeReturnHeap.byteOffset, effective_chargeReturnData.length);

	return [].slice.call(resultFromArray);
}