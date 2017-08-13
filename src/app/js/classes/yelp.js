import { searchYelpBusiness, searchYelpBusinessReviews } from '../modules/paths';
import * as Request from '../modules/request';
import Mode from './mode';

export default class Yelp extends Mode {
    constructor(name) {
        super(name);
    }

    searchBusiness(id) {
        return Request.getRequest(searchYelpBusiness(id)).then(response => {
            const { data } = response;
            return data;
        });
    }

    searchBusinesses() {}

    searchReviews(id) {
        return Request.getRequest(searchYelpBusinessReviews(id)).then(response => {
            const { data } = response;
            return data;
        });
    }
}
