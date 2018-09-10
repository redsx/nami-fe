export default {
  parseQuery(url) {
    const queryObj = {};
    const reg = /[?&]([^=&#]+)=([^&#]*)/g;
    const querys = url.match(reg);
    if(querys){
      for(const i in querys){
        const query = querys[i].split('=');
        const key = query[0].substr(1);
        const value = decodeURI(query[1] || '');
        queryObj[key] ? queryObj[key] = [].concat(queryObj[key], value) : queryObj[key] = value;
      }
    }
    return queryObj;
  }
};