
export class AutoIDGenerator{
    constructor(private storageKey: string){

    }

    public GetAutoID(): number {
        // read current last used value
        let curr = Number(localStorage.getItem(this.storageKey + '-AutoID'));
        if (curr === 0) {
            curr = 0; // don't start at 1.  Instead start with a negative number
        }
        curr -= 1;
        // save for future
        localStorage.setItem(this.storageKey + '-AutoID', curr.toString());
        // return value
        return curr;
    }

}