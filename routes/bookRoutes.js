import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
    try {
        const book = await Book.create(req.body);

        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// READ ALL
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();

        res.json(books);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// READ ONE
router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.json(book);
    } catch (error) {
        res.status(400).json({
            message: "Invalid book ID"
        });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.json(book);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.json({
            message: "Book deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Invalid book ID"
        });
    }
});

export default router;