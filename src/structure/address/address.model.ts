import { HTTP400Error } from './../../lib/utils/httpErrors';
import { IAddressModel, addressType } from './address.interface';
import { Address } from './address.schema';

class AddressModel {
    public async createAddress(data: IAddressModel) {
        let address;
        if (data.parent.length > 0) {
            address = await Address.findOne({ name: data.name, parent: data.parent });
        } else {
            address = await Address.findOne({ name: data.name });
        }
        if (address) {
            throw new HTTP400Error(data.name + ' ' + data.addressType + ' already exist!');
        } else {
            const address = new Address(data);
            await address.save();
            return address;
        }
    }

    public async deleteAddress(data: IAddressModel) {
        const exist = await Address.findById(data._id);
        if (exist) {
            const isKaBacha = await Address.find({ parent: exist.name });
            const request = isKaBacha.map(
                (item) =>
                    new Promise(async (resolve) => {
                        resolve(await Address.deleteMany({ parent: item.name }));
                    }),
            );
            await Promise.all([
                ...request,
                await Address.deleteMany({ parent: exist.name }),
                await Address.deleteOne({ _id: data._id }),
            ]);
            return 'Address Deleted';
        } else {
            throw new HTTP400Error('Address Not Found!!');
        }
    }

    public async getAddress(query: any) {
        return await Address.find(query);
    }

    public async updateAddress(data: IAddressModel) {
        const done = await Address.findByIdAndUpdate(data._id, data);
        if (done) {
            return 'Address updated';
        } else {
            throw new HTTP400Error(data, name + ' ' + data.addressType + ' not found!');
        }
    }

    public async getAddressCount(query: { addressType: addressType }) {
        return await Address.find(query).countDocuments();
    }
}

export default new AddressModel();
