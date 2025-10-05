<?php

namespace App\Repository;

use App\Entity\Dogfood;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Dogfood>
 *
 * @method Dogfood|null find($id, $lockMode = null, $lockVersion = null)
 * @method Dogfood|null findOneBy(array $criteria, array $orderBy = null)
 * @method Dogfood[]    findAll()
 * @method Dogfood[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DogfoodRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Dogfood::class);
    }

//    /**
//     * @return Dogfood[] Returns an array of Dogfood objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('d.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Dogfood
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
