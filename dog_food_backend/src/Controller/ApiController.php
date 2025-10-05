<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{
    /**
     * @Route("/api/items", name="api_get_items", methods={"GET"})
     */
    public function getItems(): JsonResponse
    {
        $items = [
            ["id" => 1, "name" => "Item 1"],
            ["id" => 2, "name" => "Item 2"],
        ];
        return $this->json($items);
    }

    /**
     * @Route("/api/items", name="api_add_item", methods={"POST"})
     */
    public function addItem(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        // Save to database (Doctrine ORM can be used here)
        return $this->json(["status" => "Item added!"]);
    }
}