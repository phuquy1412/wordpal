import User from '../model/User.js';

export const getAllUsers= async (req,res) =>{
   try {
    const Users= await User.find();
    res.status(200).json(Users);
   } catch (error) {
    console.error("Lỗi khi gọi getAllUsers", error);
    res.status(500).json({message:"Lỗi máy chủ khi lấy db User"}); 
   }
};

export const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body); 

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser 
            }
        });

    } catch (error) {
      
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email đã tồn tại. Vui lòng sử dụng email khác."
            });
        }
        console.error("Lỗi khi gọi createUser:", error);
        res.status(500).json({message: "Lỗi máy chủ khi tạo User."});  
    }
};


export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id; 

    
        const allowedUpdates = {
            displayName: req.body.displayName,
            profilePicture: req.body.profilePicture,
        };

        const updateData = {};
        Object.keys(allowedUpdates).forEach(key => {
            if (allowedUpdates[key] !== undefined && allowedUpdates[key] !== null) {
                updateData[key] = allowedUpdates[key];
            }
        });
        
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "Không có dữ liệu hợp lệ để cập nhật." });
        }


        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData, 
            {
                new: true,
                runValidators: true 
            }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Không tìm thấy user với ID đã cho." });
        }

        res.status(200).json({
            status: "success",
            data: {
                user: updatedUser
            }
        });
        
    } catch (error) {
        console.error("Lỗi khi gọi updateUser:", error);
        res.status(500).json({ message: "Lỗi máy chủ khi cập nhật User." });  
    }
};

export const deleteUser=async(req,res) =>{
    try {
        const deleteUser= await User.findByIdAndDelete(req.params.id);
        if(!deleteUser){
            return res.status(404).json({message:"Không tìm thấy user với ID đã cho."});
        }
        res.status(200).json(deleteUser);
    } catch (error) {
        console.error("Lỗi khi gọi deleteUser:", error);
        res.status(500).json({message:"Lỗi máy chủ khi xóa User."});
    }
};

// Lấy thông tin của user đang đăng nhập
export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng." });
        }
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (error) {
        console.error("Lỗi khi lấy thông tin cá nhân:", error);
        res.status(500).json({ message: "Lỗi máy chủ." });
    }
};

// User tự cập nhật thông tin cá nhân (displayName, profilePicture)
export const updateMe = async (req, res, next) => {
    try {
        // Chỉ cho phép cập nhật một số trường nhất định
        const body = {};
        if (req.body.displayName) body.displayName = req.body.displayName;
        if (req.body.profilePicture) body.profilePicture = req.body.profilePicture;

        const updatedUser = await User.findByIdAndUpdate(req.user.id, body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser
            }
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin cá nhân:", error);
        res.status(500).json({ message: "Lỗi máy chủ." });
    }
};