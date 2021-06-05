import { HTTP400Error } from './../../lib/utils/httpErrors';
import { IAddressModel, addressType } from './address.interface';
import { Address } from './address.schema';

class AddressModel {
    public async createAddress(data: IAddressModel) {
        let address;
        if (data.parent && data.parent.length > 0) {
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

    public async getAddress(query: { addressType: addressType }) {
        const exist = await Address.find(query);
        if (exist.length > 0) {
            return exist;
        } else {
            throw new HTTP400Error('No address exist for this type');
        }
    }

    public async checkPincode(query: { name: string }) {
        const exist = await Address.findOne({ ...query, addressType: addressType.pincode })
            .populate({
                path: 'parent',
                select: 'name _id',
                populate: {
                    path: 'parent',
                    select: 'name _id',
                },
            })
            .lean();

        if (exist) {
            const areas = await Address.find({ parent: exist.parent._id, addressType: addressType.area })
                .select('name _id')
                .lean();
            return {
                city: exist.parent,
                state: exist.parent.parent,
                area: areas,
            };
        } else {
            throw new HTTP400Error('Pincode does not exist');
        }
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
