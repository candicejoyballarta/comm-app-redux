function isObjectEmpty(obj: object): boolean {
	for (const key in obj) {
		if (obj.hasOwnProperty(key) && obj[key]) {
			return false;
		}
	}
	return true;
}

export default isObjectEmpty;
