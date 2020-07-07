export function insertAt<T>(arr: T[], item: T, index: number): T[] {
	return [...arr.slice(0, index), item, ...arr.slice(index)];
}

export function removeAt<T>(arr: T[], index: number): T[] {
	return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function updateAt<T>(arr: T[], valuesToUpdate: { [key: string]: any }, index: number): T[] {
	const objectToUpdate = arr[index];
	const arrayStart = arr.slice(0, index);
	const arrayEnd = arr.slice(index + 1);
	return [...arrayStart, { ...objectToUpdate, ...valuesToUpdate }, ...arrayEnd];
}
