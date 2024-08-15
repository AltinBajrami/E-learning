import crypto from 'crypto';

export default string => crypto.createHash('md5').update(string).digest('hex');
