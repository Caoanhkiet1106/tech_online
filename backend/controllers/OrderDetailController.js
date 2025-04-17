export async function getOrderDetails(req, res) {
    const orderDetails = await db.OrderDetail.findAll({});
    res.status(200).json({
        message: "Get order details successfully",
    });
}

export async function getOrderDetailById(req, res) {
    const { id } = req.params;
    const orderDetail = await db.OrderDetail.findByPk(id);
    if (!orderDetail) return res.status(404).json({
        message: "Order detail not found",
    });
    res.status(200).json({
        message: "Get order detail by id successfully",
    });
}

export async function insertOrderDetail(req, res) {
    const orderDetail = await db.OrderDetail.create(req.body);
    res.status(201).json({
        message: "Insert order detail successfully",
        data: orderDetail,
    });
}

export async function updateOrderDetail(req, res) {
    const { id } = req.params;
    const [updated] = await db.OrderDetail.update(req.body, {
        where: { id }
    });
    if (updated === 0) {
        return res.status(404).json({ message: "Order detail not found" });
    }
    const updatedOrderDetail = await db.OrderDetail.findByPk(id);
    res.status(200).json({
        message: "Update order detail successfully",
    });
}

export async function deleteOrderDetail(req, res) {
    const { id } = req.params;
    const deleted = await db.OrderDetail.destroy({
        where: { id }
    });
    if (deleted === 0) {
        return res.status(404).json({ message: "Order detail not found" });
    }
    res.status(200).json({
        message: "Delete order detail successfully",
    });
}