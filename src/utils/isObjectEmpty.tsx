// function for checking if the object has values
function isObjectEmpty(obj: object): boolean {
	for (const key in obj) {
		if (obj.hasOwnProperty(key) && obj[key as keyof typeof obj]) {
			// return false if object key has value
			return false;
		}
	}
	// return falsetrue if object key does not have value
	return true;
}

export default isObjectEmpty;
