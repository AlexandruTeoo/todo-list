export function createCategory(name){
    return {
        id: crypto.randomUUID(),
        name
    };
}