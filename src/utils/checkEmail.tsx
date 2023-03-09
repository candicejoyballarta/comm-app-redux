function checkEmail(email: string) {
	// Check if email has exactly one "@" symbol
	const atSymbolIndex = email.indexOf('@');
	if (atSymbolIndex === -1 || atSymbolIndex !== email.lastIndexOf('@')) {
		return false;
	}

	// Check if there is at least one "." symbol after the "@" symbol
	const domain = email.slice(atSymbolIndex + 1);
	const dotSymbolIndex = domain.indexOf('.');
	if (dotSymbolIndex === -1) {
		return false;
	}

	// Check if there are no "." symbols immediately before or after the "@" symbol
	const localPart = email.slice(0, atSymbolIndex);
	if (localPart.endsWith('.') || localPart.startsWith('.')) {
		return false;
	}

	// Check if there are no consecutive "." symbols in the domain
	if (domain.includes('..')) {
		return false;
	}

	return true;
}

export default checkEmail;
